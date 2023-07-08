import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import AlertContextProvider from "../contexts/AlertContext";
import CategoriesContextProvider from "../contexts/CategoriesContext";
import LanguageContextProvider from "../contexts/LanguageContext";
import CreateLandmarkForm from "../components/CreateLandmarkForm/CreateLandmarkForm";
import GovernorateContextProvider from "../contexts/GovernorateContext";

const CreateLandmarkPage = () => {
  const { t } = useTranslation();
  const formName = "CreateLandmarkForm";
  return (
    <Box
      sx={{
        minHeight: `${window.innerHeight - 160}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="title"
        sx={{ color: "var(--PrimaryColor)", fontSize: "36pt" }}
      >
        {t(`${formName}.title`)}
      </Typography>
      <LanguageContextProvider>
        <CategoriesContextProvider>
          <GovernorateContextProvider>
            <AlertContextProvider>
              <CreateLandmarkForm formName={formName} />
            </AlertContextProvider>
          </GovernorateContextProvider>
        </CategoriesContextProvider>
      </LanguageContextProvider>
    </Box>
  );
};

export default CreateLandmarkPage;
