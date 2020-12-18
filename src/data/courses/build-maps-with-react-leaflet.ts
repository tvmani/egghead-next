import {Question, QuestionSet, CourseQuestions} from './questionTypes'

const geoJsonLocation: QuestionSet = {
  id:
    'react-add-geojson-location-data-to-a-react-leaflet-map-with-a-geojson-instance',
  version: '1.0.0',
  questions: [
    {
      id: 'add-geojson-location',
      version: '1.0.0',
      type: 'theater',
      text: 'How can we add our GeoJSON data to the map?',
      value: `
Create a GeoJSON instance and use \`addTo\` to add that instance to your React Leaflet map.
\`\`\`js
useEffect(() => {

// ...

const geoJson = new L.GeoJSON(locations)

geoJson.addTo(map)

}, [mapRef])
\`\`\`
      `,
    },
  ],
}

const geoJsonStandard: QuestionSet = {
  id: 'react-understanding-the-basics-of-the-geojson-standard',
  version: '1.0.0',
  questions: [
    {
      id: 'geoJSONStandard',
      version: '1.0.0',
      type: 'theater',
      text: "What should you set in 'properties' for your GeoJSON?",
      value:
        'The key is to be consistent with what you set. They can be whatever meta-data you want for that location. For our resturant data we will set properties like: name, delivery, deliverRadius, and website. These will be useful when Popups are added!',
    },
  ],
}

const customizeWithCSS: QuestionSet = {
  id:
    'react-change-the-background-color-of-a-react-leaflet-popup-with-css-selectors',
  version: '1.0.0',
  questions: [
    {
      id: 'CSSSelectors',
      version: '1.0.0',
      type: 'theater',
      text:
        'What CSS Selectors do you need to use to override React Leaflet Background colors?',
      value:
        'The .leaflet-popup-content-wrapper and .leaflet-popup-tip classes that are already used in Leaflet Popup components',
    },
  ],
}

const reverseCoordinates: QuestionSet = {
  id:
    'react-add-a-shaded-react-leaflet-circle-to-the-map-based-on-geojson-data',
  version: '1.0.0',
  questions: [
    {
      id: 'reverseCoords',
      version: '1.0.0',
      type: 'theater',
      text:
        'Why do we have to reverse the coordinates of the data that is passed to React Leaflet?',
      value:
        'React Leaftlet Circle API expects our coordinates to be passed in with Latitude first and Longitude next. Because our data is not stored that way, we need to reverse the array before passing it in.',
    },
  ],
}

const pathClass: QuestionSet = {
  id: 'react-change-the-color-of-the-react-leaflet-delivery-zone',
  version: '1.0.0',
  questions: [
    {
      id: 'pathClass',
      version: '1.0.0',
      type: 'theater',
      text:
        'Where do options come from when customizing a React Leaflet circle?',
      value:
        'Options are inherited from the Path class from React Leaflet that is shared by Polygon, Polyline, and Circle classes.',
    },
  ],
}

const cleanUseEffect: QuestionSet = {
  id:
    'react-clean-up-location-event-handler-resources-when-page-unmounts-in-react-useeffect',
  version: '1.0.0',
  questions: [
    {
      id: 'cleanUpUseEffect',
      version: '1.0.0',
      type: 'theater',
      text: "How do you clean up event handler's in React useEffect?",
      value: `
      Return a function that will remove that event handler from the DOM.

      \`\`\`js
      useEffect(() => {
        const { current = {} } = mapRef;
        const { leafletElement: map } = current;

        if ( !map ) return;

        map.on('locationfound', handleOnLocationFound);

        return () => {
          map.off('locationfound', handleOnLocationFound);
        }
      }, [mapRef]);
      \`\`\`
      `,
    },
  ],
}

const leafletGuideQuestionSet: CourseQuestions = {
  courseSlug: 'build-maps-with-react-leaflet',
  lessonQuestionSets: [
    geoJsonStandard,
    geoJsonLocation,
    customizeWithCSS,
    reverseCoordinates,
    pathClass,
    cleanUseEffect,
  ],
}

export default leafletGuideQuestionSet
