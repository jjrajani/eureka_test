import { useCallback, useState } from "react";
import { MetabolicMasteryFormState } from "types/types";
import {
  Activity,
  ExerciseFITT,
  Gender,
  Goal,
  MetabolicMasteryCalculatorResult,
} from "types/types";
import {
  BMICalculator,
  BMRCalculator,
  CalorieIntakeCalculator,
  ExerciseFITTCalculator,
  HandServingSizeCalculator,
  MacroRatioCalculator,
} from "utils/calculators";
import modifyAndOpenPDF from "utils/modifyAndOpenPDF/metabolicMastery/modifyAndOpenMetabolicMasteryPDF";

export interface UseMetabolicMastery {
  calculateResults: (vals: MetabolicMasteryFormState) => void;
  loading: boolean;
  results?: MetabolicMasteryCalculatorResult;
  downloadResults: () => void;
}

const useMetabolicMastery = (): UseMetabolicMastery => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MetabolicMasteryCalculatorResult>();
  const [formVals, setFormVals] = useState<MetabolicMasteryFormState>();

  const calculateResults = useCallback(
    (vals: MetabolicMasteryFormState) => {
      setFormVals(vals);
      setLoading(true);
      setResults(undefined);

      let bmi = BMICalculator(parseInt(vals.weight, 10), {
        ft: parseInt(vals.heightFt, 10),
        IN: parseInt(vals.heightIn, 10),
      });

      let bmr = BMRCalculator({
        age: parseInt(vals.age, 10),
        gender: vals.gender as Gender,
        feet: parseInt(vals.heightFt, 10),
        inches: parseInt(vals.heightIn, 10),
        weight: parseInt(vals.weight, 10),
      });

      let calorieIntake = CalorieIntakeCalculator({
        activity: vals.activity as Activity,
        age: parseInt(vals.age, 10),
        goal: vals.goal as Goal,
        gender: vals.gender as Gender,
        feet: parseInt(vals.heightFt, 10),
        inches: parseInt(vals.heightIn, 10),
        weight: parseInt(vals.weight, 10),
      });

      let macro = MacroRatioCalculator(vals.goal as Goal);

      let handSizes = HandServingSizeCalculator({
        calorieIntake: calorieIntake,
        macro,
        weight: parseInt(vals.weight, 10),
      });

      let exerciseFitt = ExerciseFITTCalculator({
        age: parseInt(vals.age, 10),
        exercise: vals.exerciseFitt as ExerciseFITT,
        gender: vals.gender as Gender,
        rhr: parseInt(vals.rhr, 10),
      });

      setLoading(false);
      setResults({
        bmi,
        bmr,
        calorieIntake,
        exerciseFitt,
        macro,
        handSizes,
      });
    },
    [setLoading, setResults]
  );

  const downloadResults = useCallback(async () => {
    if (formVals && results) {
      const thing = await modifyAndOpenPDF(results, formVals);
    }
  }, [formVals, results]);

  console.log("results", results);

  return {
    calculateResults,
    downloadResults,
    loading,
    results,
  };
};

export default useMetabolicMastery;
