import { Box, Image, Text } from "@chakra-ui/react"
import Parser from "rss-parser"

import ButtonLink from "@/components/Buttons/ButtonLink"
import { H2 } from "@/components/Headings"
import ContentContainer from "@/components/ContentContainer"
import ImageSplitContent from "@/components/ImageSplitContent"
import HomeHero from "@/components/Heroes/HomeHero"

import { getAllFellowsFrontmatter } from "@/utils/md"
import BlogFeed from "@/components/BlogFeed"
import WhoAreNextBillion from "@/components/WhoAreNextBillion"

export const getStaticProps = async () => {
  const parser = new Parser({
    customFields: {
      item: ["description"],
    },
  })

  const feed = await parser.parseURL(
    "https://blog.ethereum.org/en/next-billion/feed.xml"
  )
  const allFellowsFrontmatter = getAllFellowsFrontmatter()

  return {
    props: {
      allFellowsFrontmatter,
      blogs: feed.items,
    },
  }
}

const HomePage = ({ allFellowsFrontmatter, blogs }) => {
  return (
    <>
      <Box pos="relative" top="-64px" mb="-64px" >
        <Box pos="absolute" zIndex={-1} top={0} left={0} right={0} bg="#0E6899" h={"100%"} >
          <Image src={'/images/homepage/home-stars.jpg'} alt="Stars" w="100%" h="100%" objectFit="cover" objectPosition="bottom" />
        </Box>
        <HomeHero allFellowsFrontmatter={allFellowsFrontmatter} />
      </Box>
      <Box bg="linear-gradient(180deg, #0E6899 0%, #006EA3 100%)">
        <ContentContainer>
          <ImageSplitContent
            image={'/images/homepage/fellow_home.jpg'}
            imageBorder="right"
            imageSide="right"
          >
            <Box gap={8}>
              <H2>The Next Billion Fellowship</H2>
              <Text fontSize={18}>
                The Next Billion Fellowship at the Ethereum Foundation is a search
                for stories. Stories that inspire us to focus on the important
                things, to find balance and fairness in the way we go about
                solving our problems, to push deeper into the mysteries of human
                cooperation.
              </Text>
              <Text fontSize={18} mb={16}>
                During the course of 6 months, Fellows receive support to drive
                their own projects, and tell their own stories of Ethereum-enabled
                public goods destined to help billions coordinate and thrive.
              </Text>
              <ButtonLink href="/about">About the program</ButtonLink>
            </Box>
          </ImageSplitContent>
          <ImageSplitContent image={'/images/homepage/devcon_home.jpg'} imageBorder="left" imageSide="left">
            <Box gap={8}>
              <H2>Devcon SEA Scholars</H2>
              <Text fontSize={18} mb={16}>
                Devcon is the Ethereum conference for developers, researchers,
                thinkers, and makers. Every year, the devcon scholars program
                provides dozens of full scholarships to connect, learn, and build
                together with the Ethereum community, wherever it is in the world.
              </Text>
              <ButtonLink href="/scholars">Learn more</ButtonLink>
            </Box>
          </ImageSplitContent>
        </ContentContainer>
      </Box>
      <WhoAreNextBillion />
      <Box bg="linear-gradient(180deg, #022B35 0%, #006EA3 50%, #056589 100%)">
        <ContentContainer mb={8}>
          <Box px={{ base: 8, md: 16 }} gap={8}>
            <H2 variant="action" pt={16}>
              Our blog updates
            </H2>
            <BlogFeed blogs={blogs} />
          </Box>
      </ContentContainer>
      </Box>
    </>
  )
}

export default HomePage
