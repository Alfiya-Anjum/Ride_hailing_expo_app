import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { useFetch } from '@/lib/fetch';
import { Driver, MarkerData } from '@/types/type';
import { icons } from '@/constants';
import { useDriverStore, useLocationStore } from '@/store';
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from '@/lib/map';


    const Map = () => {
      const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");

      const {
        userLongitude,
        userLatitude,
        destinationLatitude,
        destinationLongitude,
      } = useLocationStore();

      const { selectedDriver, setDrivers } = useDriverStore();
      const [markers, setMarkers] = useState<MarkerData[]>([]);
      
      const region = calculateRegion({
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      });
     
      useEffect(() => {
        
        if (Array.isArray(drivers)) {
          if (!userLatitude || !userLongitude) return;
          
          const newMarkers = generateMarkersFromData({
            data: drivers,
            userLatitude,
            userLongitude,
          });
          setMarkers(newMarkers);
        }
      }, [drivers, userLatitude, userLongitude]);

      useEffect(() => {
        if (
          markers.length > 0 &&
          destinationLatitude !== undefined &&
          destinationLongitude !== undefined
        ) {
          calculateDriverTimes({
            markers,
            userLatitude,
            userLongitude,
            destinationLatitude,
            destinationLongitude,
          }).then((drivers) => {
            setDrivers(drivers as MarkerData[]);
          });
        }
      }, [markers, destinationLatitude, destinationLongitude]);

      if (loading || (!userLatitude && !userLongitude))
        return (
          <View className="flex justify-between items-center w-full">
            <ActivityIndicator size="small" color="#000" />
          </View>
        );
    
      if (error)
        return (
          <View className="flex justify-between items-center w-full">
            <Text>Error: {error}</Text>
          </View>
        );
      

      return (
        <View style={{ flex: 1, borderRadius: 16, overflow: 'hidden' }}>
          <MapView
  provider={PROVIDER_DEFAULT}
  style={{ flex: 1 }}
  showsUserLocation={true}
  showsPointsOfInterest={false}
  region={region}
>
  {markers.length > 0 && markers.map((marker, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: marker.latitude,
        longitude: marker.longitude,
      }}
      title={marker.title}
      image={
        selectedDriver === +marker.id ? icons.selectedMarker : icons.marker
      }
    />
  ))}

{destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
          <MapViewDirections
            origin={{
              latitude: userLatitude!,
              longitude: userLongitude!,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
            strokeColor="#0286FF"
            strokeWidth={2}
          />
        </>
      )}
</MapView>

        </View>
      );
      
    };
    
    export default Map;
    

