import { Fonts } from "@/utils/fonts";
import { StyleSheet } from "react-native";

export const Typography = StyleSheet.create({
  h1: {
    fontFamily: Fonts.bold,
    fontSize: 32,
  },
  h2: {
    fontFamily: Fonts.semiBold,
    fontSize: 24,
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: 20,
  },
  body: {
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  caption: {
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
});