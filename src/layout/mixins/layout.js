import { reactive } from 'vue';
import { updatePreset } from '@primevue/themes';

export const sharedLayoutState = reactive({
    layoutConfig: {
        primary: 'emerald',
        darkTheme: false
    },
    colors: [
        { name: 'sky', palette: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' } },
        { name: 'emerald', palette: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' } }
    ]
});

export default {
    computed: {
        isDarkTheme() {
            return sharedLayoutState.darkTheme;
        },

        getPrimary() {
            return sharedLayoutState.primary;
        }
    },

    methods: {
        toggleDarkMode() {
            if (!document.startViewTransition) {
                this.executeDarkModeToggle();
                return;
            }

            document.startViewTransition(() => this.executeDarkModeToggle());
        },

        executeDarkModeToggle() {
            sharedLayoutState.darkTheme = !sharedLayoutState.darkTheme;
            document.documentElement.classList.toggle('app-dark');
        },

        updateColors() {
            sharedLayoutState.primary = sharedLayoutState.primary === 'sky' ? 'emerald' : 'sky';
            updatePreset(this.getPresetExt());
        },

        getPresetExt() {
            const color = sharedLayoutState.colors.find((c) => c.name === sharedLayoutState.primary);

            return {
                semantic: {
                    primary: color.palette,
                    colorScheme: {
                        light: {
                            primary: {
                                color: '{primary.500}',
                                contrastColor: '#ffffff',
                                hoverColor: '{primary.600}',
                                activeColor: '{primary.700}'
                            },
                            highlight: {
                                background: '{primary.50}',
                                focusBackground: '{primary.100}',
                                color: '{primary.700}',
                                focusColor: '{primary.800}'
                            }
                        },
                        dark: {
                            primary: {
                                color: '{primary.400}',
                                contrastColor: '{surface.900}',
                                hoverColor: '{primary.300}',
                                activeColor: '{primary.200}'
                            },
                            highlight: {
                                background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                                focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                                color: 'rgba(255,255,255,.87)',
                                focusColor: 'rgba(255,255,255,.87)'
                            }
                        }
                    }
                }
            };
        }
    }
};
