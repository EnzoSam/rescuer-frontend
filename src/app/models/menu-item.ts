export interface IItemMenu {
    label: string;
    icon: string;
    showOnMobile: boolean;
    showOnTablet: boolean;
    showOnDesktop: boolean;
    route:string;
    items:IItemMenu[]
}
