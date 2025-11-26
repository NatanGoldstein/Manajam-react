
export const events = [
    {
        id: 1,
        bandId: 1, // link to band
        date: new Date("2025-11-12"),
        startTime: '19:00',
        endTime: '21:00',
        topic: 'Recording Session',
        location: 'Studio Groove',
        songsList: [1, 2], // links to songs
        attendingMembers: [1, 2],
    },
    {
        id: 2,
        bandId: 1, 
        date: new Date("2025-11-12"),
        startTime: '19:00',
        endTime: '21:00',
        topic: 'Recording Session',
        location: 'Studio Groove',
        songsList: [2, 3],
        attendingMembers: [1, 2],
    },
    {
        id: 3,
        bandId: 2, 
        date: new Date("2025-11-12"),
        startTime: '19:00',
        endTime: '21:00',
        topic: 'Recording Session',
        location: 'Studio Groove',
        songsList: [4, 5],
        attendingMembers: [1, 3],
    },
    {
        id: 4,
        bandId: 2, 
        date: new Date("2025-11-12"),
        startTime: '19:00',
        endTime: '21:00',
        topic: 'Recording Session',
        location: 'Studio Groove',
        songsList: [4, 5],
        attendingMembers: [1, 3],
    },
];