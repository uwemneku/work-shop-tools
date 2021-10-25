import * as React from 'react';
import SideMenu from './Components/SideMenu';
import tw from 'tailwind-styled-components/dist/tailwind';
import Tools from './Pages/Tools';

const Container = tw.div`
      flex
`

export default function App() {
  return (
    <Container>
      <SideMenu />
      <div className='flex-1' >
        <Tools />
      </div>
    </Container>
  );
}
