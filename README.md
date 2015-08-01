Simple solution for the task:

For the purposes of this exercise we have provided a dummy api for accessing a fake mongodb collection. There are two kinds of documents in the test collection. They are as follows:

## Objects

Objects represent an entity in the physical world, such as a phone, cpu or an operating system. Objects follow the below schema:
```javascript
  {
    name: 'Test Object',
    name_url: 'test-object',
    properties: {
      width: 20, // the object is 20cm wide...
      height: 30, // ...30cm long...
      cores: 5, // ...and has 5 cores
    }
  }
```

* `name` - the name of the object
* `name_url` - the [slug](http://en.wikipedia.org/wiki/Slug_(web_publishing)#Slug) of the object
* `properties` - a javascript object whose keys correspond to the names of properties (see below) and whose values represent the value of that property for the object. In the above example, the property width has the value of 20 for the test object. 

### Embedded objects

Objects can also contain other objects as properties. This models the embedding of one object in another such as a smartphone having an operating system (for example, android is embedded inside nexus 5). This is modelled as below:

```javascript
  {
    name: 'Nexus 5',
    name_url: 'nexus-5',
    properties: {
      'Android 4.4 KitKat': true
    }
  }
```

When embedding an object in another object, the name of the embedded object is used a key inside the parent object's properties attribute, with the value of the key set to true.

## Properties

Properties represent the characteristics of an object, such as its size, weight or number of cores. Properties adhere to the following schema.

```javascript
  {
    name: 'width',
    unit: 'cm'
  }
```

* `name`: the name of the property, which should be used as a key in the `properties` attribute of an object
* `unit` (optional): the unit of the property

## Dummy API

To access the test database we have provided a dummy api. The methods of this api are as follows:

* `findByName(names, cb)` - look up objects or properties by their name
  * `names`: `Array` names to search the database for
  * `cb(err, objects)`: `Function` callback - `err` is an `Error` or null if no error and `objects` is an `Array` of properties and/or objects. 
    
* `findByNameUrl(name_urls, cb)` - look up objects by their name_url
  * `name_urls`: `Array` name_urls to search the database for
  * `cb(err, objects)`: `Function` - `err` is an `Error` or null and `objects` is an `Array` of objects

## Task

Your task is to create a nodejs web application using the dummy database provided. Your application should respond to HTTP GET on the path `http://<path-to-your-app>/<object-name-url>` (e.g. `http://localhost:3000/nexus-5`). If an object with the given name url does not exist, your application should respond with a http 404 and an error page. If an object with the given name url does exist your application should render a pretty representation of the object in HTML, its properties and its hierarchy of embedded objects. For example:

  ```
  - Nexus 5 (name of the main object)
    cores 4 
    Front Camera Megapixel 1.3 MP
    rest of nexus 5 properties

    - Android 4.4 KitKat
      4k Yes
      widgets Yes
      rest of Android 4.4 properties

    - Qualcomm Snapdragon 800
      properties
      
      - Qualcomm Adreno 330
        properties
      - Qualcomm Krait 400
        properties
  ```

## Notes

The application will be tested against the following urls:

* http://localhost:3000/nexus-5
* http://localhost:3000/android-4-4-kitkat
* http://localhost:3000/qualcomm-snapdragon-800
* http://localhost:3000/qualcomm-adreno-330
* http://localhost:3000/qualcomm-krait-400