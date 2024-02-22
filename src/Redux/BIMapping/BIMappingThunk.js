import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getElementType = createAsyncThunk(
  "BIMapping/getElementType",
  async (objIds) => {
    try {
      let { departmentId, productId, productEnvId } = objIds;
      let url = config.GET_ELEMENT_TYPE.replace("#department-id#", departmentId)
        .replace("#product-id#", productId)
        .replace("#product-env-id#", productEnvId);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getElementInstancesOfGivenType = createAsyncThunk(
  "BIMapping/getElementInstancesOfGivenType",
  async (objIds) => {
    try {
      let { departmentId, productId, productEnvId, elementType } = objIds;
      let url = config.GET_ELEMENT_INSTANCES_TYPE.replace(
        "#department-id#",
        departmentId
      )
        .replace("#product-id#", productId)
        .replace("#product-env-id#", productEnvId)
        .replace("#element-type#", elementType);

      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
