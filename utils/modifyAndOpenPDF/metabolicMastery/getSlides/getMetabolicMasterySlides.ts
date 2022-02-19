import {
  Gender,
  Activity,
  Goal,
  DietPreference,
  Supplement,
} from "types/types";
import {
  MetabolicMasteryCalculatorResult,
  MetabolicMasteryFormState,
} from "types/types";
import { PDFDocument } from "pdf-lib";
import getDietTypeSlides from "./getDietTypeSlides";
import getSupplementSlides from "./getSupplementSlides";
import getMealMasteryProfileSlides from "./getMealMasteryProfileSlides";
import getRestRxSlides from "./getRestRxSlides";
import getExerciseFittSlides from "./getExerciseFittSlides";
import getFittTrackerSlides from "./getFittTrackerSlides";
import getStressSlides from "./getStressSlides";
import getDressDashboardSlides from "./getDressDashboardSlides";
import attachSlides from "../../utils/attachSlides";
import getPortionTrackerSlides from "../../utils/getPortionTrackerSlides";
import getConclusionSlides from "../../utils/getConclusionSlides";

const getMealMasterySlides = async (
  results: MetabolicMasteryCalculatorResult,
  userInput: MetabolicMasteryFormState
) => {
  console.log("results", results);
  console.log("userInput", userInput);

  const introSlides = await fetch(
    "/pdfs/Metabolic_Mastery_Intro_Slides.pdf"
  ).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(introSlides);

  // Diet Type Slide
  const dietTypeSlides = await getDietTypeSlides(userInput);
  await attachSlides(dietTypeSlides, pdfDoc);

  // Daily Portion Tracker
  const portionTrackerSlides = await getPortionTrackerSlides();
  await attachSlides(portionTrackerSlides, pdfDoc, 4);

  // Conclusion Slides
  const conclusionSlides = await getConclusionSlides();
  await attachSlides(conclusionSlides, pdfDoc);

  const restRxSlides = await getRestRxSlides(userInput);
  await attachSlides(restRxSlides, pdfDoc, 8);

  const exerciseFittSlides = await getExerciseFittSlides(userInput);
  await attachSlides(exerciseFittSlides, pdfDoc, 9);

  const fittTrackerSlides = await getFittTrackerSlides();
  await attachSlides(fittTrackerSlides, pdfDoc, 10);

  const stressSlides = await getStressSlides(userInput);
  await attachSlides(stressSlides, pdfDoc, 11);

  // Suplement Slide
  const supplementSlides = await getSupplementSlides(userInput);
  await attachSlides(supplementSlides, pdfDoc, 12);

  const dressDashboardSlides = await getDressDashboardSlides();
  await attachSlides(dressDashboardSlides, pdfDoc, 13);

  // Meal Master Profile
  // const mealMasterySlides = await getMealMasteryProfileSlides(userInput);
  // await attachSlides(mealMasterySlides, pdfDoc);
  //

  return pdfDoc;
};

export default getMealMasterySlides;
