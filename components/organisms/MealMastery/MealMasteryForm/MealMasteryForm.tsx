import { useContext } from "react";
import MealPlannerContext from "../context";
import { Form } from "react-final-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import validate from "./validate";
import AgeField from "components/molecules/fields/Age";
import GenderField from "components/molecules/fields/Gender";
import WeightField from "components/molecules/fields/Weight";
import HeightFtField from "components/molecules/fields/HeightFt";
import HeightInField from "components/molecules/fields/HeightIn";
import WaterField from "components/molecules/fields/Water";
import ActivityLevelField from "components/molecules/fields/ActivityLevel";
import GoalField from "components/molecules/fields/Goal";
import DietPreferenceField from "components/molecules/fields/DietType";
import SupplementTypeField from "components/molecules/fields/SupplementType";
import { MealMasteryFormState } from "types/types";

interface MealMasteryFormProps {}

const MealMasteryForm = ({}: MealMasteryFormProps) => {
  const { calculateResults, results } = useContext(MealPlannerContext);
  const initialValues: Partial<MealMasteryFormState> = {
    age: undefined,
    gender: "null",
    weight: undefined,
    heightFt: undefined,
    heightIn: undefined,
    water: undefined,
    activity: "null",
    goal: "null",
    dietPreference: "null",
    supplementType: "null",
  };

  const onSubmit = (vals: MealMasteryFormState) => {
    console.log("vals", vals);
    calculateResults(vals);
  };

  console.log("results", results);

  return (
    <Box mt={3} mb={8}>
      <Form<MealMasteryFormState>
        onSubmit={onSubmit}
        validate={validate}
        initialValues={initialValues}
      >
        {(formRenderProps) => {
          return (
            <form onSubmit={formRenderProps.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <AgeField />
                </Grid>
                <Grid item xs={12} md={4}>
                  <GenderField />
                </Grid>
                <Hidden mdDown>
                  <Grid item xs={12} md={4}>
                    <WeightField />
                  </Grid>
                </Hidden>
                <Grid item xs={6} md={3}>
                  <HeightFtField />
                </Grid>
                <Grid item xs={6} md={3}>
                  <HeightInField />
                </Grid>
                <Hidden mdUp>
                  <Grid item xs={12} md={4}>
                    <WeightField />
                  </Grid>
                </Hidden>
                <Grid item xs={12} md={6}>
                  <WaterField />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ActivityLevelField />
                </Grid>
                <Grid item xs={12} md={4}>
                  <GoalField />
                </Grid>
                <Grid item xs={12} md={4}>
                  <DietPreferenceField />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <SupplementTypeField />
                </Grid>
                <Grid item xs={12}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button type="submit">SUBMIT</Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Form>
    </Box>
  );
};

export default MealMasteryForm;
