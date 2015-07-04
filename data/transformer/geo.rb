require 'json'
require 'csv'
require 'pp'
#0 ﻿WKT
#1 id
#2 rna_id
#3 rcl_id
#4 address
#5 house_number
#6 range_low
#7 range_high
#8 road_name
#9 locality
#10 territorial_authority
#11 road_name_utf8
#12 address_utf8
#13 locality_utf8
#14 shape_X
#15 shape_Y

whanganui = {}
CSV.foreach("nz-street-address-electoral-WHANGANUI-ONLY.csv") do |row|

  if row[10] =~ /^Wanganui/ && #(row[8] =~ /^(anzac)/i) &&
    row[5] =~ /^[0-9a-z]+$/i &&
    row.first =~ /^POINT \(([^ ]+) ([^ ]+)\)/
    data = { "lon" => $1.to_f, "lat" => $2.to_f }
    num = row[5]
    street = row[8].
      sub(/ (road|street|drive|crescent|parade|pde|st|place|pl)$/i, '').
      gsub(/[^a-z ]+/i, ' ').gsub(/ /,'_')
    key = num.downcase + "_" + street[0..5].downcase
    whanganui[key] = data
#    puts({ key => data }.to_json)
#    exit 1
  end
end
File.open("geocode.json","w") { |f| f.puts(JSON.generate(whanganui, :indent => ' ', :object_nl => "\n")) }
