import { Box, Container, Flex, HStack, Link, Text, IconButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const nav = [
  { label: 'NETWORK', href: '/network' },
  { label: 'LOGIN', href: '/login' },
  { label: 'HOME', href: '/' },
];

export default function HeaderBasic() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box as="header" position="fixed" top="0" left="0" right="0" zIndex={1000}>
      <Box
        borderBottomWidth={scrolled ? '1px' : '0'}
        borderColor={scrolled ? 'whiteAlpha.200' : 'transparent'}
        bg={scrolled ? 'rgba(17, 24, 39, 0.5)' : 'transparent'}
        color="white"
        backdropFilter={scrolled ? 'saturate(180%) blur(12px)' : 'none'}
        transition="background-color .2s ease, border-color .2s ease, backdrop-filter .2s ease"
      >
        <Container maxW="6xl" py={3}>
          <Flex align="center" justify="space-between" gap={6}>
            {/* Logo placeholder */}
            <HStack>
              <Box boxSize="28px" bg="blue.500" borderRadius="full" />
              <Text fontWeight="bold" letterSpacing="wide">HERRMANN'S SOLUTIONS</Text>
            </HStack>

            <HStack display={{ base: 'none', md: 'flex' }} gap={8}>
              {nav.map((item) => (
                <NavLink key={item.href} href={item.href} active={item.label === 'HOME'}>
                  {item.label}
                </NavLink>
              ))}
            </HStack>

            <IconButton
              aria-label="Menu"
              display={{ base: 'inline-flex', md: 'none' }}
              variant="ghost"
              color="whiteAlpha.900"
            >
              <Box
                as="span"
                w="18px"
                h="2px"
                bg="white"
                position="relative"
                _before={{ content: '""', position: 'absolute', w: '18px', h: '2px', bg: 'white', top: '-6px' }}
                _after={{ content: '""', position: 'absolute', w: '18px', h: '2px', bg: 'white', top: '6px' }}
              />
            </IconButton>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

function NavLink({ href, children, active = false }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link href={href} position="relative" fontWeight="semibold" _hover={{ color: 'blue.400' }}>
      {children}
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={-2}
        height="2px"
        bg={active ? 'blue.400' : 'whiteAlpha.700'}
        opacity={active ? 1 : 0.5}
      />
    </Link>
  );
}