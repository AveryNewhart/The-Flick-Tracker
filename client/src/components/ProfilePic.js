import React, { useState, useEffect } from "react";
import Filebase64 from "react-file-base64";
import { useMutation } from "@apollo/client"
import { ADD_PROFILE_PIC } from "../utils/mutations";
import auth from "../utils/auth";