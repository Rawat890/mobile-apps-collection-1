import { Fonts } from "@/utils/fonts"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from 'expo-router'
import React from 'react'
import useTheme from '../../hooks/useTheme'
const TabsLayout = () => {
  const { colors } = useTheme();
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        height: 100,
        paddingBottom: 30,
        paddingTop: 10,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontFamily: Fonts.medium
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Todos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" size={size} color={color} />
          )
        }} />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          )
        }} />
    </Tabs>
  )
}

export default TabsLayout