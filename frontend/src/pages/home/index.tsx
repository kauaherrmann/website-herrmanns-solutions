import { Container, Box } from '@chakra-ui/react';
import HeaderBasic from '../../components/common/header/headerBasic';

export default function HomePage() {
  return (
    <>
      <HeaderBasic />
      <Box pt={{ base: 16, md: 20 }}>
        <Container maxW="6xl" py={12}>
          
        </Container>
      </Box>
    </>
  );
}