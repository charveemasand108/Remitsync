import { useSelector } from "react-redux";

export const useAuth = () => {
    const activeRole = useSelector((state) => state.remitsync?.activeUserRole || "citi_ops");

    const rolesMap = {
        citi_ops: {
            fullName: "Vikramaditya Roy",
            title: "Citi TTS Cross-Border Ops Lead",
            org: "Citibank N.A. (TTS UAE / India)",
            email: "vikram.roy@citigroup.com",
            badge: "CITI-OPERATOR-L3",
            avatar: "VR"
        },
        npci_auditor: {
            fullName: "Priya Sharma",
            title: "Chief Settlement Auditor",
            org: "National Payments Corporation of India (NPCI)",
            email: "priya.sharma@npci.org.in",
            badge: "NPCI-SUPER-AUDIT",
            avatar: "PS"
        },
        drunix_dev: {
            fullName: "Alex Chen",
            title: "Drunix Core Infrastructure Engineer",
            org: "Drunix DLT Working Group",
            email: "alex.chen@drunix.org",
            badge: "DRUNIX-CORE-MAINTAINER",
            avatar: "AC"
        }
    };

    return {
        user: rolesMap[activeRole] || rolesMap.citi_ops,
        isLoaded: true
    };
};
