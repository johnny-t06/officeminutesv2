"use client";
import Header from "@components/Header";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Page = () => {
  const router = useRouter();

  const accordionStyles = {
    padding: "var(--sds-size-padding-lg)",
    gap: "var(--sds-size-space-200)",
    borderRadius: "4px",
    border: "1px solid #D9D9D9",
    background: "#FFFFFF",
    boxShadow: "none",
    margin: "0 !important",
    "&::before": {
      display: "none",
    },
  };

  const accordionSummaryStyles = {
    minHeight: "0 !important",
    "& .MuiAccordionSummary-content": {
      margin: "8px 0 !important",
    },
  };

  return (
    <div>
      <Header
        leftIcon={
          <IconButton onClick={() => router.back()} edge="start">
            <ArrowBackIcon />
          </IconButton>
        }
        title="Get Help"
      />
      <Box className="flex flex-col gap-4 mt-3 mb-16">
        <Accordion sx={accordionStyles}>
          <AccordionSummary
            sx={accordionSummaryStyles}
            expandIcon={<ArrowDropDownIcon sx={{ color: "#191C20" }} />}
          >
            <Typography>What is a group queue?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="#43474E" fontSize={14}>
              If you&apos;re interested or have similar questions to a post on
              the board, you can join the group queue, meaning that you can join
              the owner of the question&apos;s group session. There is a maximum
              of 4 people per group queue.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={accordionStyles}>
          <AccordionSummary
            sx={accordionSummaryStyles}
            expandIcon={<ArrowDropDownIcon sx={{ color: "#191C20" }} />}
          >
            <Typography>How do I find my class code?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="#43474E" fontSize={14}>
              You can find your class code by reaching out to your professor!
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={accordionStyles}>
          <AccordionSummary
            sx={accordionSummaryStyles}
            expandIcon={<ArrowDropDownIcon sx={{ color: "#191C20" }} />}
          >
            <Typography>
              Can I join multiple groups on the queue at the same time?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="#43474E" fontSize={14}>
              No, you can only join one group on the queue at a time.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={accordionStyles}>
          <AccordionSummary
            sx={accordionSummaryStyles}
            expandIcon={<ArrowDropDownIcon sx={{ color: "#191C20" }} />}
          >
            <Typography>
              I don&apos;t think the queue is supposed to be closed. Where can I
              find a TA?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="#43474E" fontSize={14}>
              [answer here]
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={accordionStyles}>
          <AccordionSummary
            sx={accordionSummaryStyles}
            expandIcon={<ArrowDropDownIcon sx={{ color: "#191C20" }} />}
          >
            <Typography>
              What happens if I miss my turn on the queue?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="#43474E" fontSize={14}>
              [answer here]
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={accordionStyles}>
          <AccordionSummary
            sx={accordionSummaryStyles}
            expandIcon={<ArrowDropDownIcon sx={{ color: "#191C20" }} />}
          >
            <Typography>
              What should I do if office hours ends before my turn?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="#43474E" fontSize={14}>
              [answer here]
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={accordionStyles}>
          <AccordionSummary
            sx={accordionSummaryStyles}
            expandIcon={<ArrowDropDownIcon sx={{ color: "#191C20" }} />}
          >
            <Typography>
              Can I join the queue before office hours begins?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="#43474E" fontSize={14}>
              No, you cannot join the queue before office hours begins.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};

export default Page;
