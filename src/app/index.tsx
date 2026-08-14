import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { Screen } from "../components/ui/screen";

const Index = () => {
  return (
    <Screen edges={["bottom"]} padded={false}>
      <Text variant="h1">Hello World</Text>

      <Stack>
        <Text variant="h1">Hello World</Text>
        <Text variant="h1">Hello World</Text>
        <Text variant="h1">Hello World</Text>
      </Stack>
      <View style={{ flex: 1, backgroundColor: "red" }} />
    </Screen>
  );
};

export default Index;
