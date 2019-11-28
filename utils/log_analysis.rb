require 'awesome_print'
require 'time'

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
ap r
# event wise
ap a
# problem wise
ap pr