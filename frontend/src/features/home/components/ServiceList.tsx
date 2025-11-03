import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useServices } from '../hooks/useServices';

export function ServiceList() {
  const { data, isLoading, error } = useServices();

  if (isLoading) return <Text>Carregando serviços...</Text>;
  if (error) return <Text>Erro ao carregar serviços.</Text>;

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mt={8}>
      {data?.map((s) => (
        <Box key={s.id} borderWidth="1px" borderRadius="md" p={4}>
          <Heading size="md">{s.titulo}</Heading>
          <Text mt={2}>{s.descricao}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default ServiceList;
