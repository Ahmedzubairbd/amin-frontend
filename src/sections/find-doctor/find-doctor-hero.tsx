"use client";
import { useState } from "react";
import { m, MotionProps } from "framer-motion";
// @mui
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box, { BoxProps } from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import Iconify from "src/components/iconify";
import { MotionContainer, varFade } from "src/components/animate";

// ----------------------------------------------------------------------

type FindDoctorHeroProps = {
  onSearch: (query: string) => void;
};

export default function FindDoctorHero({ onSearch }: FindDoctorHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Box
      sx={{
        height: { md: 360 },
        py: { xs: 5, md: 0 },
        overflow: "hidden",
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage:
          "url(/assets/background/overlay_1.svg), url(/assets/images/about/hero.jpg)",
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: "absolute" },
            textAlign: { xs: "center", md: "unset" },
          }}
        >
          <TextAnimate
            text="Find"
            variants={varFade().inRight}
            sx={{ color: "primary.main" }}
          />
          <Stack
            spacing={2}
            display="inline-flex"
            direction="row"
            sx={{ color: "common.white" }}
          >
            <TextAnimate text="Your" />
            <TextAnimate text="Doctor" />
          </Stack>
          <m.div variants={varFade().in}>
            <TextField
              fullWidth
              placeholder="Search Doctors..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon="eva:search-fill"
                      sx={{ color: "text.disabled" }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 5,
                maxWidth: 360,
                [`& .${outlinedInputClasses.root}`]: { bgcolor: "common.white" },
                [`& .${outlinedInputClasses.input}`]: { typography: "subtitle1" },
              }}
            />
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}

type TextAnimateProps = BoxProps &
  MotionProps & {
    text: string;
  };

function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: "h1",
        overflow: "hidden",
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      {text.split("").map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
