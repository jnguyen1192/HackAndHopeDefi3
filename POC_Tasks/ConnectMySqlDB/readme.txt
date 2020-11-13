Null values in Geometry actually isn't working that is why we will define rules:
- A null point is POINT(0.000 90.000)
- A null geojson is {"type": "Polygon", "coordinates": [[[0.0000, 90.0000], [0.0000, 90.1000], [0.1000, 90.1000], [0.0000, 90.0000]]]}
