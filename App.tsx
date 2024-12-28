import { StackContainer } from './navigation/StackContainer';
import { Providers } from "./providers/Providers";

export default function App() {
  return (
    <Providers>
      <StackContainer />
    </Providers>
  );
}