import RideLayout from "@/components/Ridelayout";
import { Text, View } from "react-native";
import DriverCard from "@/components/DriverCard";
import { FlatList } from "react-native-gesture-handler";
import CustomButton from "@/components/Custombutton";
import { router } from "expo-router";
import { useDriverStore } from "@/store";

const ConfirmRide = () => {
        const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  return (
    <RideLayout title={"Choose a Rider"} snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => 
        <DriverCard
        item={item}
        selected={selectedDriver!}
        setSelected={() => setSelectedDriver(Number(item.id)!)}
      />}
        ListFooterComponent={() => (
            <View className="mx-5 mt-10">
              <CustomButton
                title="Select Ride"
                onPress={() => router.push("/(root)/book-ride")}
              />
            </View>
          )}
        />
    </RideLayout>
  );
};

export default ConfirmRide;
