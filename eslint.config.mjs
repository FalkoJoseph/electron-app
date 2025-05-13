import eslintConfigPrettier from "@electron-toolkit/eslint-config-prettier";
import tseslint from "@electron-toolkit/eslint-config-ts";
import pluginQuery from "@tanstack/eslint-plugin-query";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginReact from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  { ignores: ["**/node_modules", "**/dist", "**/out"] },
  tseslint.configs.recommended,
  ...pluginQuery.configs["flat/recommended"],
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat["jsx-runtime"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      perfectionist: perfectionist,
      "react-compiler": reactCompiler,
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,
      "@typescript-eslint/explicit-function-return-type": "off",
      "perfectionist/sort-array-includes": [
        "error",
        {
          customGroups: [],
          groupKind: "literals-first",
          groups: [],
          ignoreCase: true,
          newlinesBetween: "ignore",
          order: "asc",
          partitionByNewLine: false,
          specialCharacters: "keep",
          type: "alphabetical",
          useConfigurationIf: {},
        },
      ],
      "perfectionist/sort-enums": [
        "error",
        {
          forceNumericSort: false,
          ignoreCase: true,
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          sortByValue: false,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-interfaces": [
        "error",
        {
          customGroups: [
            {
              elementNamePattern: "^(on|handle)[A-Z]",
              groupName: "callback",
            },
          ],
          groupKind: "mixed",
          groups: ["unknown", "callback"],
          ignoreCase: true,
          ignorePattern: [],
          newlinesBetween: "ignore",
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-modules": [
        "error",
        {
          customGroups: [],
          groups: [
            "declare-enum",
            "export-enum",
            "enum",
            ["declare-interface", "declare-type"],
            ["export-interface", "export-type"],
            ["interface", "type"],
            "declare-class",
            "class",
            "export-class",
            "declare-function",
            "export-function",
            "function",
          ],
          ignoreCase: true,
          newlinesBetween: "ignore",
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: true,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-object-types": [
        "error",
        {
          customGroups: [
            {
              elementNamePattern: "^(on|handle)[A-Z]",
              groupName: "callback",
            },
          ],
          groups: ["unknown", "callback"],
          ignoreCase: true,
          ignorePattern: [],
          newlinesBetween: "ignore",
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          customGroups: [
            {
              elementNamePattern: "^init$",
              groupName: "init",
              selector: "method",
            },
            {
              elementNamePattern: "^data$",
              groupName: "data",
              selector: "property",
            },
            {
              elementNamePattern: "^(on|handle)[A-Z]",
              groupName: "callback",
              selector: "property",
            },
          ],
          destructuredObjects: true,
          groups: ["init", "data", "unknown", "callback"],
          ignoreCase: true,
          ignorePattern: [],
          newlinesBetween: "ignore",
          objectDeclarations: true,
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          styledComponents: true,
          type: "alphabetical",
          useConfigurationIf: {},
        },
      ],
      "perfectionist/sort-sets": [
        "error",
        {
          customGroups: [],
          groupKind: "literals-first",
          groups: [],
          ignoreCase: true,
          newlinesBetween: "ignore",
          order: "asc",
          partitionByNewLine: false,
          specialCharacters: "keep",
          type: "alphabetical",
          useConfigurationIf: {},
        },
      ],
      "perfectionist/sort-switch-case": [
        "error",
        {
          ignoreCase: true,
          order: "asc",
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-variable-declarations": [
        "error",
        {
          ignoreCase: true,
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "react-compiler/react-compiler": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
      "react/boolean-prop-naming": [
        "error",
        { rule: "^(is|has|as)[A-Z]([A-Za-z0-9]?)+" },
      ],
      "react/hook-use-state": ["error", { allowDestructuredState: true }],
      "react/jsx-handler-names": [
        "error",
        {
          checkInlineFunction: false,
          checkLocalVariables: false,
          eventHandlerPrefix: "handle",
          eventHandlerPropPrefix: "on",
          ignoreComponentNames: [],
        },
      ],
      "react/jsx-max-depth": ["error", { max: 10 }],
      "react/jsx-newline": ["error", { allowMultilines: true, prevent: true }],
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          ignoreCase: true,
          multiline: "ignore",
          reservedFirst: true,
          shorthandLast: true,
        },
      ],
      "react/no-unused-prop-types": ["error"],
    },
  },
  eslintConfigPrettier,
);
