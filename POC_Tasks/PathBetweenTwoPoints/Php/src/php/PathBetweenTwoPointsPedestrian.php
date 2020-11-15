<?php


class PathBetweenTwoPointsPedestrian
{
    function __construct($key='choisirgeoportail', $origin='1.4296871423721542,48.9491452350537', $destination='1.8691402673721758,48.80463579895799', $url='http://wxs.ign.fr/KEY/itineraire/rest/route.json?') // constructor
    {
        $this->key = $key; // load key
        $this->origin = $origin; // load origin point
        $this->destination = $destination; // load destination point
        $this->url = $url; // load url
    }

    function build_url_using_key() // build the url
    {
        return str_replace("KEY", $this->key, $this->url);  # add the key on url
    }

    function build_data_options() // build the data
    {
        $data = array(
            'origin' => $this->origin,
            'destination' => $this->destination,
            'method' => 'DISTANCE',
            'graphName' => 'Pieton'
        ); // give value on each option

        return http_build_query($data, '', '&'); // build data string
    }

    function get_http_result()
    {

        $curl_handle=curl_init(); // check extension on php.ini
        curl_setopt($curl_handle, CURLOPT_URL,$this->build_url_using_key() . $this->build_data_options());
        curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
        curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl_handle, CURLOPT_USERAGENT, 'ItinerairePieton');
        $query = curl_exec($curl_handle);
        curl_close($curl_handle);

        return $query;
    }
}