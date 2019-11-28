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
ap r