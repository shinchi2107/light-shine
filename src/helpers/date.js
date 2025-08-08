import { format, parseISO } from "date-fns";

function formatDate(dateString, pattern = "dd.MM.yyyy") {
    try {
        const date = typeof dateString === "string" ? parseISO(dateString) : dateString;
        return format(date, pattern);
    } catch (e) {
        console.error("formatDate error:", e);
        return "";
    }
}

export { formatDate };