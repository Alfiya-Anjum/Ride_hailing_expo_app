import { View, Text } from 'react-native';
import { useLocationStore } from '@/store';
import RideLayout from '@/components/Ridelayout';
import GoogleTextInput from '@/components/GoogleTextInput';
import { icons } from '@/constants';
import { router } from 'expo-router';
import CustomButton from '@/components/Custombutton';

const FindRide = () => {    
    const{
        userAddress,
        destinationAddress,
        setDestinationLocation,
        setUserLocation,

    } = useLocationStore();
    return (
        <RideLayout title="Ride" snapPoints={['85%']}>
           <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>

        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>

        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>
      <CustomButton
        title="Find Now"
        onPress={() => router.push(`/(root)/confirm-ride`)}
        className="mt-5"
      />
        </RideLayout>
    );
}
export default FindRide;