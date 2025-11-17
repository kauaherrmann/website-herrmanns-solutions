import { Box, Container } from '@chakra-ui/react';
import HeaderBasic from '../../components/common/header/headerBasic';
import CarrocelHome from '../../components/carroucels/carrocelHome';

const slides = [
  {
    id: 's1',
    heading: "",
    subheading: '',
    label: 'Suporte 24H',
    image: '/image 7.svg',
  },
  {
    id: 's2',
    heading: '',
    subheading: '',
    label: 'Infraestrutura',
    image: '/image 7.svg',
  },
  {
    id: 's3',
    heading: '',
    subheading: '',
    label: 'Tecnologia',
    image: '/image 7.svg',
  },
  {
    id: 's4',
    heading: '',
    subheading: '',
    label: 'Performance',
    image: '/image 7.svg',
  },
];

export default function HomePage() {
  return (
    <>
      <HeaderBasic />
      <Box pt={{ base: 16, md: 20 }}>
        <CarrocelHome slides={slides} />
        <Container maxW="6xl" py={16}>
          <Box h="1000px" bg="gray.50" borderWidth="1px" borderRadius="md" />
        </Container>
      </Box>
    </>
  );
}