export const getTickets = () => {
    return JSON.parse(localStorage.getItem("tickets")) || [];
};

export const saveTickets = (tickets) => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
};

export const createTicket = (ticket) => {
    const tickets = getTickets();
    const newTicket = {
        id: tickets.length + 2,
        ...ticket,
        status: "Open",
    };

    const updatedTickets = [...tickets, newTicket];
    saveTickets(updatedTickets);
    return newTicket;
};

