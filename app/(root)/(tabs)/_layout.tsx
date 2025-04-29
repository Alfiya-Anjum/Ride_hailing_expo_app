import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { View, Text, Image, ImageSourcePropType } from "react-native";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => {
  return (
    <View
      className={`flex flex-row justify-center items-center rounded-full ${
        focused ? "bg-general-300" : ""
      }`}
    >
      <View
        className={`rounded-full w-12 h-12 items-center justify-center ${
          focused ? "bg-general-400" : ""
        }`}
      >
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          className="w-7 h-7"
        />
      </View>
    </View>
  );
};

const Layout = () => {
  return (
<Tabs
  initialRouteName="home"
  screenOptions={{
    tabBarActiveTintColor: "#ffffff",
    tabBarInactiveTintColor: "#888888",
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: "#1c1c1e",
      position: "absolute",
      bottom: 20,
      left: 20,
      right: 20,
      height: 60,
      borderRadius: 50,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      
    },
    tabBarItemStyle: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    tabBarIconStyle: {
      alignItems: "center",
      justifyContent: "center",
    },
  }}
>

  

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
    
  );
};

export default Layout;