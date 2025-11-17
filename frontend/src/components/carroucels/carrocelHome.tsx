import { Box, Container, Flex, HStack, Stack, Heading, Text } from '@chakra-ui/react';
import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Slide = {
  id: string;
  heading: string;
  subheading?: string;
  label: string;
  title?: string;
  image: string;
};
type Responsive<T> =
  | T
  | {
      base?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      '2xl'?: T;
    };

type Props = {
  slides: Slide[];
  height?: Responsive<string | number>;
  intervalMs?: number;
};

const MotionBox = motion(Box as any); // aplica animações suaves no fundo

export default function CarrocelHome({
  slides,
  height = { base: '70vh', md: '85vh' },
  intervalMs = 6000,
}: Props) {
  const [index, setIndex] = useState(0); // controla qual slide está ativo
  const total = slides.length;

  const railRef = useRef<HTMLDivElement | null>(null); // trilho onde ficam os cards
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]); // referencia cada card para medir tamanho
  const [indicatorLeft, setIndicatorLeft] = useState(0); // posição horizontal do destaque
  const [indicatorWidth, setIndicatorWidth] = useState(120); // largura do destaque

  const recalcIndicator = useCallback(() => {
    if (!railRef.current || index >= itemRefs.current.length) {
      return;
    }

    const target = itemRefs.current[index];
    if (!target) {
      return;
    }

    const railRect = railRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const center = targetRect.left + targetRect.width / 2 - railRect.left; // calcula centro relativo do card

    setIndicatorLeft(center);
    setIndicatorWidth(Math.min(Math.max(targetRect.width * 0.7, 110), 200));
  }, [index]);

  useLayoutEffect(() => {
    recalcIndicator();
  }, [recalcIndicator, slides]);

  useEffect(() => {
    const handleResize = () => recalcIndicator(); // recalcula quando a tela muda
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [recalcIndicator]);

  const next = () => setIndex((i) => (i + 1) % total); // avança automaticamente
  const goTo = (i: number) => setIndex(i); // navegação ao clicar no card

  useEffect(() => {
    const t = setInterval(next, intervalMs); // inicia autoplay com intervalo
    return () => clearInterval(t);
  }, [intervalMs, total]);

  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image; // pré-carrega imagens para evitar flicker
    });
  }, [slides]);

  const active = slides[index];
  itemRefs.current.length = total;

  return (
    <Box position="relative" h={height} w="100%" overflow="hidden" color="white">
      {/* fundo com imagem do slide atual */}
      <Box position="absolute" inset={0}>
        <AnimatePresence mode="wait">
          <MotionBox
            key={active.id}
            position="absolute"
            inset={0}
            bgImage={`url('${active.image}')`}
            bgPos="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </AnimatePresence>
        {/* gradiente para melhorar contraste do texto */}
        <Box position="absolute" inset={0} bgGradient="linear(to-b, blackAlpha.700, blackAlpha.500, blackAlpha.700)" />
      </Box>

      <Container maxW="10xl" h="100%" position="relative">
        <Flex direction="column" justify="center" h="100%">
          {/* bloco de títulos principal */}
          <Stack gap={4} maxW={{ base: '100%', md: '70%' }}>
            <Heading size="2xl" lineHeight="1.1" whiteSpace="pre-line">
              {active.heading}
            </Heading>
            {active.subheading && (
              <Text fontSize={{ base: 'lg', md: 'xl' }} color="whiteAlpha.800">
                {active.subheading}
              </Text>
            )}
          </Stack>

          {/* área da linha do tempo; ajuste pt/pb para subir ou descer o conjunto */}
          <Box
            ref={railRef}
            position="relative"
            mt="auto"
            pt={{ base: 8, md: 10 }}
            pb={{ base: 1, md: 1 }}
          >
            {/* linha de suporte discreta */}
            <Box
              position="absolute"
              insetX={{ base: 2, md: 4 }}
              bottom={20}
              h="1px"
              bg="whiteAlpha.200"
              zIndex={0}
            />
            {/* linha principal do trilho */}
            <Box
              position="absolute"
              insetX={0}
              bottom={20}
              h="2px"
              bg="rgba(255, 255, 255, 0.65)"
              zIndex={0}
            />
            <Box
              position="absolute"
              bottom={20}
              h="2px"
              borderRadius="full"
              bgGradient="linear(to-r, transparent, cyan.400, transparent)"
              opacity={total > 1 ? 0.95 : 0}
              zIndex={0}
              transition="transform .35s ease, width .35s ease, opacity .35s ease"
              style={{
                left: 0,
                width: `${indicatorWidth}px`,
                transform: `translateX(${indicatorLeft - indicatorWidth / 2}px)`, // move o destaque junto com o card ativo
              }}
            />
            {/* glow inferior; ajuste bottom/h para deixar números visíveis */}
            <Box
              position="absolute"
              insetX={0}
              bottom={5}
              h="48px"
              bgGradient="linear(to-t, rgba(5, 10, 18, 0.88), transparent)"
              pointerEvents="none"
              zIndex={0}
            />
            {/* lista de cards; alinhe gap ou wrap conforme necessidade */}
            <Flex
              gap={{ base: 6, md: 10 }}
              wrap="wrap"
              align="flex-end"
              position="relative"
              zIndex={1}
            >
              {slides.map((s, i) => (
                <TimelineItem
                  key={s.id}
                  index={i}
                  title={s.title ?? s.label}
                  active={i === index}
                  onClick={() => goTo(i)}
                  icon={renderTimelineIcon(i, i === index)} // escolhe ícone correspondente à etapa
                  ref={(el) => {
                    itemRefs.current[i] = el;
                    if (i === index && el) {
                      requestAnimationFrame(recalcIndicator); // recalcula após mudança visual
                    }
                  }}
                />
              ))}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

function renderTimelineIcon(index: number, isActive: boolean): ReactNode {
  const size = isActive ? 64 : 52; // ícone aumenta no card selecionado

  switch (index) {
    case 0:
      return <SupportIcon size={size} />;
    case 1:
      return <InfraIcon size={size} />;
    case 2:
      return <HexClusterIcon size={size} />;
    case 3:
      return <PerformanceIcon size={size} />;
    default:
      return <SupportIcon size={size} />;
  }
}

type IconProps = { size?: number };

function IconShell({ size = 52, children }: { size?: number; children: ReactNode }) {
  return (
    <Box
      position="relative"
      w={`${size}px`}
      h={`${size}px`}
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.06)"
      border="1px solid rgba(255, 255, 255, 0.14)"
      display="grid"
      placeItems="center"
      overflow="hidden"
    >
      <Box position="absolute" inset={0} bgGradient="linear(to-br, whiteAlpha.300, transparent)" opacity={0.4} />
      <Box position="relative">{children}</Box>
    </Box>
  );
}

function SupportIcon({ size }: IconProps) {
  return (
    <IconShell size={size}>
      <BubbleIcon size={(size ?? 52) * 0.68} />
    </IconShell>
  );
}

function InfraIcon({ size = 52 }: IconProps) {
  const inner = size * 0.56;
  const offset = size * 0.14;
  return (
    <IconShell size={size}>
      <Box position="relative" w={`${inner}px`} h={`${inner}px`}>
        <Box position="absolute" inset={0} border="2px solid" borderColor="cyan.300" opacity={0.7} transform="rotate(10deg)" />
        <Box
          position="absolute"
          top={`${offset}px`}
          left={`${offset * 0.6}px`}
          w={`${inner * 0.6}px`}
          h={`${inner * 0.6}px`}
          border="2px solid"
          borderColor="whiteAlpha.900"
          opacity={0.85}
          transform="rotate(-18deg)"
        />
        <Box
          position="absolute"
          bottom={`${offset * 0.2}px`}
          right={`${offset * 0.5}px`}
          w={`${inner * 0.3}px`}
          h={`${inner * 0.3}px`}
          bg="cyan.400"
          opacity={0.9}
        />
      </Box>
    </IconShell>
  );
}

function HexClusterIcon({ size = 56 }: IconProps) {
  const hex = (ratio: number, top: number, left: number, opacity = 1) => (
    <Box
      key={`${ratio}-${top}-${left}`}
      position="absolute"
      top={`${top * 100}%`}
      left={`${left * 100}%`}
      w={`${size * ratio}px`}
      h={`${size * ratio}px`}
      bg="cyan.300"
      opacity={opacity}
      clipPath="polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
    />
  );

  return (
    <IconShell size={size}>
      <Box position="relative" w={`${size}px`} h={`${size}px`}>
        {hex(0.44, 0.3, 0.08, 0.65)}
        {hex(0.52, 0.34, 0.42, 1)}
        {hex(0.38, 0.02, 0.4, 0.55)}
      </Box>
    </IconShell>
  );
}

function PerformanceIcon({ size = 52 }: IconProps) {
  const starSize = size * 0.58;
  return (
    <IconShell size={size}>
      <Box
        position="relative"
        w={`${starSize}px`}
        h={`${starSize}px`}
        bg="cyan.300"
        opacity={0.9}
        clipPath="polygon(50% 0%, 63% 35%, 100% 38%, 72% 61%, 82% 100%, 50% 78%, 18% 100%, 28% 61%, 0% 38%, 37% 35%)"
      >
        <Box position="absolute" inset="22%" bg="white" opacity={0.85} clipPath="inherit" />
      </Box>
    </IconShell>
  );
}

function BubbleIcon({ size = 44 }: { size?: number }) {
  return (
    <Box position="relative" w={`${size}px`} h={`${size}px`}>
      <Box
        position="absolute"
        w={`${size * 0.5}px`}
        h={`${size * 0.5}px`}
        bg="cyan.300"
        borderRadius="full"
        top={`${size * 0.05}px`}
        left={`${size * 0.18}px`}
      />
      <Box
        position="absolute"
        w={`${size * 0.32}px`}
        h={`${size * 0.32}px`}
        bg="white"
        borderRadius="full"
        top="0"
        left="0"
        opacity={0.9}
      />
      <Box
        position="absolute"
        w={`${size * 0.28}px`}
        h={`${size * 0.28}px`}
        bg="whiteAlpha.900"
        borderRadius="full"
        bottom="0"
        right="0"
        opacity={0.9}
      />
    </Box>
  );
}

type TimelineItemProps = {
  active: boolean;
  title: string;
  index: number;
  onClick: () => void;
  icon: ReactNode;
};

const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(function TimelineItem(
  { active, title, index, onClick, icon },
  ref,
) {
  const number = String(index + 1).padStart(2, '0'); // gera número 01, 02, 03...

  if (active) {
    return (
      <Box
        ref={ref}
        onClick={onClick}
        cursor="pointer"
        flex={{ base: '1 1 100%', md: '1.25 1 0' }}
        minW={{ base: '100%', md: '22%' }}
        mx="auto"
        position="relative"
        pb={{ base: 9, md: 9 }}
        transform="translateY(-8px)" // mantém o card levemente elevado
        transition="transform .3s ease"
      >
        <Box
          bg="rgba(9, 19, 35, 0.28)"
          border="none"
          borderColor="transparent"
          px={{ base: 6, md: 8 }}
          py={{ base: 6, md: 8 }}
          minH={{ base: '260px', md: '280px' }} // garante altura do card ativo
          boxShadow="0 24px 70px rgba(0, 0, 0, 0.5)"
          backdropFilter="blur(20px)"
          style={{ WebkitBackdropFilter: 'blur(20px)' }}
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            bg: 'rgba(56, 189, 248, 0.9)',
          }}
          _after={{
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '3px',
            bg: 'rgba(148, 163, 184, 0.7)',
          }}
        >
          <Stack gap={{ base: 4, md: 5 }} align="flex-start" textAlign="left">
            <Flex align="center" gap={{ base: 4, md: 5 }}>
              <Box>{icon}</Box>
              <Heading fontSize={{ base: '2xl', md: '3xl' }} lineHeight="1.1" whiteSpace="pre-line">
                {title}
              </Heading>
              <Text fontSize={{ base: 'xl', md: '2xl' }} color="cyan.300" letterSpacing="widest">
                &raquo;
              </Text>
            </Flex>
            <HStack gap={3} align="center">
              <Text fontWeight="bold" color="cyan.200" letterSpacing="widest">
                AR
              </Text>
              <Box w="1px" h="14px" bg="whiteAlpha.500" />
              <Text fontSize="sm" color="whiteAlpha.900" letterSpacing="0.4em">
                TECHNOLOGY
              </Text>
            </HStack>
          </Stack>
        </Box>
        <Box
          position="absolute"
          bottom='36px'
          left="50%"
          transform="translateX(-60%)"
          w="40px"
          h="3px"
          borderRadius="full"
          bg="white"
          boxShadow="0 0 12px rgba(226, 226, 226, 0.7)"
        />
        <Text
          position="absolute"
          bottom={{ base: 4, md: 1 }} // ajuste para mover a numeração
          left="50%"
          transform="translateX(-52%)"
          fontSize="sm"
          letterSpacing="0.6em"
          color="whiteAlpha.800"
        >
          {number}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      onClick={onClick}
      cursor="pointer"
      flex={{ base: '1 1 100%', md: '1 1 0' }}
      minW={{ base: '100%', md: '18%' }}
      mr="auto"
      position="relative"
  pb={{ base: 20, md: 24 }} // padding controla espaço para número
      opacity={0.85}
      transition="opacity .2s ease, transform .2s ease"
      _hover={{ opacity: 1, transform: 'translateY(-3px)' }}
      _after={{
        content: '""',
        position: 'absolute',
        left: '50%',
  bottom: 1,
        transform: 'translateX(-50%)',
        width: '2px',
        borderRadius: 'full',
        height: { base: '24px', md: '30px' },
        bgGradient: 'linear(to-t, whiteAlpha.700, whiteAlpha.400)',
      }}
    >
      <Stack gap={{ base: 3, md: 4 }} align="flex-start" textAlign="left" maxW={{ base: '90%', md: '80%' }}>
        {/* ícone reduzido no estado inativo */}
        <Box>{icon}</Box>
        <Heading fontSize={{ base: 'lg', md: 'xl' }} lineHeight="1.2" whiteSpace="pre-line">
          {title}
        </Heading>
      </Stack>
      <Text
        position="absolute"
        bottom={{ base: 4, md: 10 }} // reposicione se quiser números mais perto da linha
        left="50%"
        transform="translateX(-62%)"
        fontSize="sm"
        letterSpacing="0.6em"
        color="whiteAlpha.700"
      >
        {number}
      </Text>
    </Box>
  );
});