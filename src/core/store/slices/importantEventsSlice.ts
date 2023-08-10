import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../api/fetch-api";
import { ImportantEventsBasicData, ImportantEventsFormMetadata } from "../../model/importantEvents.model";
import { t } from "i18next";

interface ImportantEventsSlice {
  loadingImportantEventsBasicData: boolean;
  importantEventsBasicData: ImportantEventsBasicData;

  importantEventsFormMetadata: ImportantEventsFormMetadata;
}

const initialState = {
  loadingImportantEventsBasicData: false,
} as ImportantEventsSlice;

export const loadImportantEventsBasicData = createAsyncThunk(
  "importantEvents/loadImportantEventsBasicData",
  async (_, thunkAPI) => {
    try {
      const { response, data } = await fetchAPI({
        url: "/important-events/basicData",
        method: "GET"
      });
      if (response?.status === 200) {
        return data as ImportantEventsBasicData;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const importantEventsSlice = createSlice({
  name: "importantEvents",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadImportantEventsBasicData.pending, (state) => {
        state.loadingImportantEventsBasicData = true;
      })
      .addCase(loadImportantEventsBasicData.fulfilled, (state, { payload }) => {
        state.importantEventsBasicData = payload;
        state.importantEventsFormMetadata = [
          {
            label: t("OtherInterventionsStarted", { ns: "ImportantEvents" }),
            entityName: "otherInterventionsStarted",
            entitiesData: payload.otherInterventionsStartedEntities
          },
          {
            label: t("DuringIntervention", { ns: "ImportantEvents" }),
            entityName: "duringIntervention",
            entitiesData: payload.duringInterventionEntities
          },
          {
            label: t("DuringPast", { ns: "ImportantEvents" }),
            entityName: "duringPast",
            entitiesData: payload.duringPastEntities
          },
          {
            label: t("ChildSchool", { ns: "ImportantEvents" }),
            entityName: "childSchool",
            entitiesData: payload.childSchoolEntities
          },
          {
            label: t("ChangeAccomodation", { ns: "ImportantEvents" }),
            entityName: "changeAccomodation",
            entitiesData: payload.changeAccomodationEntities
          },
          {
            label: t("ChangeEmploymentVh1", { ns: "ImportantEvents" }),
            entityName: "changeEmploymentVh1",
            entitiesData: payload.changeEmploymentVh1Entities
          },
          {
            label: t("ChangeEmploymentVh2", { ns: "ImportantEvents" }),
            entityName: "changeEmploymentVh2",
            entitiesData: payload.changeEmploymentVh2Entities
          },
        ]
        state.loadingImportantEventsBasicData = false;
      })
      .addCase(loadImportantEventsBasicData.rejected, (state) => {
        state.loadingImportantEventsBasicData = false;
      });
  }
});

export const { } = importantEventsSlice.actions;

export default importantEventsSlice.reducer;
