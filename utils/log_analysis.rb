require 'awesome_print'
require 'time'

module Enumerable
    def sum
      self.reduce(:+)
    end

    def mean
      (self.sum/self.length.to_f).round(3)
    end

    def sample_variance
      m = self.mean
      sum = self.inject(0){|accum, i| accum +(i-m)**2 }
      sum/(self.length - 1).to_f
    end

    def standard_deviation
      Math.sqrt(self.sample_variance).round(3)
    end
end 

# for all logs
files = Dir["d/*"]
records = {}
for f in files do
    # get user code
    u = f[2..-5]
    records[u] = {}
    File.open(f).each do |line|
        # load timestamp
        time_str = line.scan(/\[.+?\]/).first.tr('[]', '')
        t = Time.strptime(time_str, "%m-%d-%Y %H:%M:%S.%N")
        # situation:interface+problem
        s = line.scan(/<.+@.+>/).first.tr('<>', '').split('@')[1]
        if !records[u].has_key?(s)
            records[u][s] = {"start" => t, "end" => t}
        else
            records[u][s]["end"] = t
        end
    end
end

r = {}
records.each do |u, s|
    r[u] = {}
    s.each do |sn, t|
        if sn == "landing" then next end
        r[u][sn] = (t["end"] - t["start"])
    end
end

a = {}
r.each do |u, ss|
    ss.each {|sn, t| if !a.has_key?(sn) then a[sn] = [t] else a[sn] << t end}
end

pr = {}
a.each do |e, ts|
    prn, v, interface = e.split('_')
    if !pr.has_key?(prn) then pr[prn] = {} end
    if !pr[prn].has_key?(interface) then pr[prn][interface] = {} end
    if !pr[prn][interface].has_key?(v) then pr[prn][interface][v] = [] end
    ts.each {|t| pr[prn][interface][v] << t}
end

# user wise
puts "\nRaw data user wise"
ap r
# event wise
# ap a
# problem wise
puts "\nRaw data problem wise"
ap pr

# processed data
# user
p_u = {}
l_u = []
r.each do |u, ts|
    l_t = []
    ts.each {|_, v| l_t << v;}
    l_u << l_t.mean
    p_u[u] = l_u[-1]
end
puts "\nUser Average Completion Time: %.3f" %  l_u.mean
puts "User Completion Time SD: %.3f" % l_u.standard_deviation
ap p_u

# problem + interface
p_p = {}
pr.each do |pn, d|
    lt = []
    d["text"].each {|_, v| lt += v}
    lg = []
    d["gui"].each {|_, v| lg += v}
    p_p[pn] = {}
    p_p[pn]["avg"] = (lt+lg).mean
    p_p[pn]["SD"] = (lt+lg).standard_deviation
    p_p[pn]["text"] = {
        "avg" => lt.mean,
        "SD" => lt.standard_deviation
    }
    p_p[pn]["gui"] = {
        "avg" => lg.mean,
        "SD" => lg.standard_deviation
    }
end

puts "\nProblem Average Time with Interface"
ap p_p

# problem version
p_v = {}
pr.each do |pn, d|
    l_a = d["text"]["va"] + d["gui"]["va"]
    l_b = d["text"]["vb"] + d["gui"]["vb"]
    p_v[pn] = {
        "va" => {
            "avg" => l_a.mean,
            "SD" => l_a.standard_deviation
        },
        "vb" => {
            "avg" => l_b.mean,
            "SD" => l_b.standard_deviation
        }
    }
end

puts "\nProblem Version Average Time"
ap p_v