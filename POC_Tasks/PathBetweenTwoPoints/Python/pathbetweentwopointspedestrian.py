import requests

key = "choisirgeoportail"  # the key is choisirgeoportail for test and development
lat_start, lon_start = "1.4296871423721542", "48.9491452350537"  # the start point
lat_end, lon_end = "1.8691402673721758", "48.80463579895799"  # the end point

get_request = "http://wxs.ign.fr/[KEY]/itineraire/rest/route.json?origin=[lat_start],[lon_start]&destination=[lat_end],[lon_end]&&method=DISTANCE&graphName=Pieton"  # the REST api request
get_request = get_request.replace("[KEY]", "%s").replace("[lat_start]", "%s").replace("[lat_end]", "%s").replace("[lon_start]", "%s").replace("[lon_end]", "%s")  # format the string
get_request = get_request % (key, lat_start, lon_start, lat_end, lon_end)  # add parameters to the request

r = requests.get(get_request)  # execute the request and get the result
print(r.text)  # print the request result
