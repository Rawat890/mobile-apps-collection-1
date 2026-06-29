import {
 Poppins_400Regular,
 Poppins_500Medium,
 Poppins_600SemiBold,
 Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";

export function useAppFonts() {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  return loaded;
}