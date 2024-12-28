import { UseDataResult, withData, WithDataProps } from "./withData";
import { Text } from "react-native";
import { createRenderer } from "react-test-renderer/shallow";

const renderer = createRenderer();

describe("withData", () => {
  it("should display a loading screen when data is undefined", () => {
    
    type WrappedProps = WithDataProps<string, unknown>;
    const WrappedComponent = ({ data }: WrappedProps) => <Text>{data}</Text>;

    const useData = (): UseDataResult<string> => ({
      data: undefined,
      error: undefined
    });

    const Component = withData(useData)(WrappedComponent);

    const result = renderer.render(<Component />);
    expect(result).toMatchSnapshot();
    
  });
});