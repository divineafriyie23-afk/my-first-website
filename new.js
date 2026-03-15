// Define Area of Interest (Kumasi, Ghana example)
var aoi = ee.Geometry.Rectangle([ -1.65, 6.4, -1.55, 6.5 ]);

// Load Sentinel-5P NO2 data
var s5p = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
            .select('NO2_column_number_density')
            .filterDate('2023-01-01', '2023-01-31') // Example date range
            .filterBounds(aoi);

// Take mean of the collection
var no2_mean = s5p.mean().clip(aoi);

// Visualize on map
var visParams = {
  min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.centerObject(aoi, 10);
Map.addLayer(no2_mean, visParams, 'Mean NO2 (Jan 2023)');

// Export the result to Google D
