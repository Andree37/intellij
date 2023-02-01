import {variants} from "@tbh-theme/palette";
import * as colormath from "colormath.js"
import type {JBTheme} from "./types";
import * as path from "path";
import * as Handlebars from "handlebars"
import * as fs from "fs";

const handlebarsIsLatte = (
    lightCol: string,
    darkCol: string,
    context: any
): string => {
    return context.data.root.isLatte ? lightCol : darkCol;
};

const handlebarsOpacity = (
    color: string,
    opacity: number,
    context: any
): string => {
    const base = context.data.root.base;

    return colormath
        .mixColor(colormath.hex.toRgb(color), colormath.hex.toRgb(base), opacity)
        .hex.toLowerCase()
        .replace("#", "");
};

const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const themePath = path.join(__dirname, "../src/main/resources/themes/");
fs.mkdirSync(themePath, {recursive: true});

Object.entries(variants).forEach(([key, value]) => {
    const isLatte = key === "latte";

    const colors = Object.entries(value)
        .map(([key, value]) => {
            const hex = value.hex.toUpperCase();
            return {
                [key]: hex,
            };
        })
        .reduce((acc, curr) => ({...acc, ...curr}), {});

    const opacity = (color: string, val: number): string => {
        // mimick the context available in handlebars,
        // pass in the colors for the current iteration
        return handlebarsOpacity(color, val, {
            data: {
                root: {
                    ...colors,
                },
            },
        });
    };

    const theme: JBTheme = {
        name: `Tbh Theme ${capitalize(key)}`,
        dark: !isLatte,
        author: "Tbh <releases@tbh-theme.com>",
        editorScheme: `/themes/${key}.xml`,
        colors: {
            brink_pink: colors.brink_pink,
            flamingo: colors.flamingo,
            mauve: colors.mauve,
            red: colors.red,
            bittersweet: colors.bittersweet,
            yellow_red: colors.yellow_red,
            emerald: colors.emerald,
            teal: colors.teal,
            sky: colors.sky,
            sapphire: colors.sapphire,
            cornflower_blue: colors.cornflower_blue,
            pink: colors.pink,
            crust: colors.crust,
            mantle: colors.mantle,
            base: colors.base,
            surface0: colors.surface0,
            surface1: colors.surface1,
            surface2: colors.surface2,
            overlay0: colors.overlay0,
            overlay1: colors.overlay1,
            overlay2: colors.overlay2,
            text: colors.text,
            subtext0: colors.subtext0,
            subtext1: colors.subtext1,
            accentColor: colors.mauve,
            secondaryAccentColor: colors.yellow_red,
            primaryForeground: colors.text,
            primaryBackground: colors.base,
            secondaryBackground: colors.surface0,
            hoverBackground: colors.surface1,
            selectionBackground: colors.surface1,
            selectionInactiveBackground: colors.base,
            borderColor: colors.surface1,
            separatorColor: colors.surface1,
        },
        ui: {
            "*": {
                arc: "7",
                background: "primaryBackground",
                selectionForeground: "primaryForeground",
                selectionInactiveForeground: "primaryForeground",
                selectionBackground: "selectionBackground",
                selectionInactiveBackground: "selectionInactiveBackground",
                inactiveBackground: "primaryBackground",
                disabledBackground: "primaryBackground",
                borderColor: "primaryBackground",
                separatorColor: "separatorColor",
            },
            List: {
                background: "mantle",
            },
            Borders: {
                color: "primaryBackground",
                ContrastBorderColor: "secondaryBackground",
            },
            ActionButton: {
                hoverBackground: "hoverBackground",
                hoverBorderColor: "hoverBackground",
                pressedBackground: "hoverBackground",
                pressedBorderColor: "hoverBackground",
            },
            Bookmark: {
                iconBackground: "accentColor",
                Mnemonic: {
                    iconForeground: "primaryForeground",
                    iconBackground: "secondaryBackground",
                    iconBorderColor: "accentColor",
                },
            },
            BookmarkMnemonicAssigned: {
                foreground: "primaryForeground",
                background: "secondaryBackground",
                borderColor: "secondaryAccentColor",
            },
            BookmarkMnemonicAvailable: {},
            BookmarkMnemonicCurrent: {
                foreground: "primaryForeground",
                background: "selectionBackground",
                borderColor: "accentColor",
            },
            Button: {
                foreground: "primaryForeground",
                startBorderColor: "secondaryBackground",
                endBorderColor: "secondaryBackground",
                startBackground: "secondaryBackground",
                endBackground: "secondaryBackground",
                focusedBorderColor: "secondaryBackground",
                disabledBorderColor: "primaryBackground",
                default: {
                    foreground: "surface1",
                    startBackground: "accentColor",
                    endBackground: "accentColor",
                    startBorderColor: "accentColor",
                    endBorderColor: "accentColor",
                    focusColor: "accentColor",
                    focusedBorderColor: "surface1",
                },
            },
            Counter: {
                foreground: "primaryBackground",
                background: "accentColor",
            },
            ComboBox: {
                modifiedItemForeground: "accentColor",
                ArrowButton: {
                    background: "secondaryBackground",
                    nonEditableBackground: "secondaryBackground",
                    disabledIconColor: "pink",
                    iconColor: "accentColor",
                },
                selectionBackground: "selectionBackground",
                nonEditableBackground: "secondaryBackground",
            },
            CompletionPopup: {
                selectionBackground: "selectionBackground",
                selectionInactiveBackground: "selectionBackground",
                matchForeground: "flamingo",
            },
            Component: {
                focusColor: "accentColor",
                borderColor: "primaryBackground",
                focusedBorderColor: "selectionBackground",
                disabledBorderColor: "selectionBackground",
                errorFocusColor: "red",
                inactiveErrorFocusColor: "red",
                warningFocusColor: "yellow_red",
                inactiveWarningFocusColor: "yellow_red",
            },
            RunWidget: {
                separatorColor: "separatorColor",
                foreground: "text",
                background: "secondaryBackground"
            },
            DragAndDrop: {
                borderColor: "selectionBackground",
            },
            Editor: {
                background: "primaryBackground",
                shortcutForeground: "accentColor",
            },
            EditorTabs: {
                background: "primaryBackground",
                underlinedTabBackground: "secondaryBackground",
                underlineColor: "accentColor",
                underlineHeight: 1,
                hoverBackground: "surface0",
                inactiveUnderlineColor: "accentColor",
            },
            FileColor: {
                Blue: isLatte
                    ? opacity(value.cornflower_blue.hex, 0.2)
                    : opacity(value.cornflower_blue.hex, 0.15),
                Emerald: isLatte
                    ? opacity(value.emerald.hex, 0.2)
                    : opacity(value.emerald.hex, 0.15),
                Bittersweet: isLatte
                    ? opacity(value.bittersweet.hex, 0.2)
                    : opacity(value.bittersweet.hex, 0.15),
                Naples_Yellow: isLatte
                    ? opacity(value.yellow_red.hex, 0.2)
                    : opacity(value.yellow_red.hex, 0.15),
                Rose: isLatte
                    ? opacity(value.red.hex, 0.2)
                    : opacity(value.red.hex, 0.15),
                Brink_Pink: isLatte
                    ? opacity(value.brink_pink.hex, 0.2)
                    : opacity(value.brink_pink.hex, 0.15),
            },
            Link: {
                activeForeground: "accentColor",
                hoverForeground: "accentColor",
                visitedForeground: "secondaryAccentColor",
                pressedForeground: "secondaryAccentColor",
            },
            NotificationsToolwindow: {
                newNotification: {
                    background: "primaryBackground",
                    hoverBackground: "hoverBackground",
                },
            },
            Notification: {
                background: "primaryBackground",
                borderColor: "mauve",
                errorBorderColor: "red",
                errorBackground: "primaryBackground",
                errorForeground: "primaryForeground",
                ToolWindow: {
                    warningForeground: "primaryForeground",
                    warningBackground: "primaryBackground",
                    warningBorderColor: "naples_yellow",
                    errorForeground: "primaryForeground",
                    errorBorderColor: "red",
                    errorBackground: "primaryBackground",
                    informativeForeground: "primaryForeground",
                    informativeBackground: "primaryBackground",
                    informativeBorderColor: "secondaryAccentColor",
                },
            },
            PasswordField: {
                background: "secondaryBackground",
            },
            Plugins: {
                SearchField: {
                    background: "secondaryBackground",
                },
                SectionHeader: {
                    foreground: "primaryForeground",
                },
                hoverBackground: "hoverBackground",
                lightSelectionBackground: "hoverBackground",
                Button: {
                    installBorderColor: "secondaryAccentColor",
                    installForeground: "secondaryAccentColor",
                    installBackground: "primaryBackground",
                    installFillForeground: "primaryBackground",
                    installFillBackground: "secondaryAccentColor",
                    installFocusedBackground: "primaryBackground",
                    updateBorderColor: "accentColor",
                    updateForeground: "primaryBackground",
                    updateBackground: "accentColor",
                },
                Tab: {
                    selectedBackground: "hoverBackground",
                    selectedForeground: "primaryForeground",
                    hoverBackground: "hoverBackground",
                },
            },
            ProgressBar: {
                failedEndColor: "naples_yellow",
                failedColor: "red",
                trackColor: "selectionBackground",
                progressColor: "accentColor",
                indeterminateStartColor: "accentColor",
                indeterminateEndColor: "secondaryAccentColor",
                passedEndColor: "teal",
                passedColor: "emerald",
            },
            Popup: {
                borderColor: "mauve",
                Header: {
                    activeBackground: "secondaryBackground",
                    inactiveBackground: "secondaryBackground",
                },
            },
            ScrollBar: {
                Mac: {
                    hoverThumbColor: "secondaryAccentColor",
                    Transparent: {
                        hoverThumbColor: "secondaryAccentColor",
                    },
                },
            },
            SearchEverywhere: {
                SearchField: {
                    background: "secondaryBackground",
                },
                Tab: {
                    selectedBackground: "secondaryBackground",
                    selectedForeground: "primaryForeground",
                },
            },
            SearchMatch: {
                startBackground: "accentColor",
                endBackground: "accentColor",
            },
            Separator: {
                separatorColor: "separatorColor",
            },
            SidePanel: {
                background: "mantle",
            },
            StatusBar: {
                borderColor: "borderColor",
                hoverBackground: "hoverBackground",
            },
            TabbedPane: {
                tabSelectionHeight: 1,
                focusColor: "hoverBackground",
                hoverColor: "hoverBackground",
                underlineColor: "accentColor",
                contentAreaColor: "primaryBackground",
            },
            Table: {
                gridColor: "hoverBackground",
                hoverBackground: "selectionBackground",
            },
            TableHeader: {
                bottomSeparatorColor: "primaryBackground",
            },
            TextField: {
                background: "secondaryBackground",
            },
            TextArea: {
                background: "mantle",
            },
            ToggleButton: {
                onBackground: "emerald",
                onForeground: "hoverBackground",
                offBackground: "selectionBackground",
                offForeground: "hoverBackground",
                buttonColor: "primaryForeground",
            },
            ToolBar: {
                background: "primaryBackground",
                borderHandleColor: "secondaryAccentColor",
            },
            ToolWindow: {
                background: "mantle",
                Button: {
                    hoverBackground: "hoverBackground",
                },
                Header: {
                    background: "primaryBackground",
                    inactiveBackground: "primaryBackground",
                    borderColor: "secondaryBackground",
                },
                HeaderTab: {
                    underlineColor: "pink",
                    inactiveUnderlineColor: "text",
                    underlineHeight: 1,
                    underlinedTabBackground: "surface1",
                    selectedInactiveBackground: "base",
                    hoverBackground: "hoverBackground",
                },
            },
            Tree: {
                rowHeight: 24,
                background: "mantle",
                modifiedItemForeground: "accentColor",
                hoverBackground: "secondaryBackground",
                selectionBackground: "selectionBackground",
                selectionInactiveBackground: "selectionInactiveBackground",
            },
            ValidationTooltip: {
                errorBackground: "mantle",
                errorBorderColor: "red",
                warningBackground: "mantle",
                warningBorderColor: "yellow_red",
            },
            VersionControl: {
                FileHistory: {
                    Commit: {
                        selectedBranchBackground: "secondaryBackground",
                    },
                },
                GitLog: {
                    headIconColor: "yellow_red",
                    localBranchIconColor: "emerald",
                    remoteBranchIconColor: "secondaryAccentColor",
                    tagIconColor: "accentColor",
                    otherIconColor: "teal",
                },
                Log: {
                    Commit: {
                        hoveredBackground: "selectionBackground",
                        currentBranchBackground: "secondaryBackground",
                    },
                },
                RefLabel: {
                    foreground: "primaryForeground",
                },
            },
            WelcomeScreen: {
                SidePanel: {
                    background: "secondaryBackground",
                },
                separatorColor: "separatorColor",
                Projects: {
                    background: "hoverBackground",
                    selectionBackground: "secondaryBackground",
                    selectionInactiveBackground: "secondaryBackground",
                    actions: {
                        background: "hoverBackground",
                    },
                },
            },
        },
        icons: {
            ColorPalette: {
                "Actions.Blue": colors.cornflower_blue,
                "Actions.Green": colors.emerald,
                "Actions.Red": colors.red,
                "Actions.Yellow": colors.yellow_red,
                "Actions.Grey": colors.overlay0,
                "Actions.GreyInline.Dark": colors.cornflower_blue,
                "Actions.GreyInline": colors.cornflower_blue,
                "Objects.Blue": colors.cornflower_blue,
                "Objects.Green": colors.emerald,
                "Objects.Grey": colors.overlay0,
                "Objects.Pink": colors.pink,
                "Objects.Purple": colors.mauve,
                "Objects.Red": colors.red,
                "Objects.RedStatus": colors.red,
                "Objects.Yellow": colors.yellow_red,
                "Objects.YellowDark": colors.flamingo,
                "Objects.BlackText": colors.surface0,
                "Tree.iconColor": colors.cornflower_blue,
            },
        },
    };

    fs.writeFileSync(
        path.join(themePath, `${key}.theme.json`),
        JSON.stringify(theme, null, 2)
    );
});

// adds the opacity function to Handlebars.js
// USAGE:
// {{opacity color opacity}}
// EXAMPLE:
// {{opacity brink_pink 0.5}}
Handlebars.registerHelper("isLatte", handlebarsIsLatte);
Handlebars.registerHelper("opacity", handlebarsOpacity);

const templatePath = path.join("generateFlavors", "template.xml");

fs.readFile(templatePath, 'utf8', (err, data) => {
    Object.entries(variants).forEach(([key, value]) => {
        const isLatte = key === "latte";
        const italicsVersions = [true, false];

        const hexValues = Object.entries(value)
            .map(([key, value]) => {
                const hex = value.hex.replace("#", "").toLowerCase();
                return {
                    [key]: hex,
                };
            })
            .reduce((acc, curr) => ({...acc, ...curr}), {});

        italicsVersions.forEach((italics) => {
            const options = {
                name: `Catppuccin ${capitalize(key)}${!italics ? " (no italics)" : ""}`,
                italics: italics,
                isLatte: isLatte,
                parent_scheme: isLatte ? "Default" : "Darcula",
                ...hexValues,
            };
            const output = Handlebars.compile(data)(options);

            const suffix = italics ? "" : "-no-italics";
            const fileName = `${key}${suffix}.xml`;
            fs.writeFileSync(path.join(themePath, fileName), output);
        });
    });
});
