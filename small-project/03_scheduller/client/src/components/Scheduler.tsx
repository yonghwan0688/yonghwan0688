import React, { useState } from 'react';

const Scheduler: React.FC = () => {
    const [schedules, setSchedules] = useState<string[]>([]);
    const [newSchedule, setNewSchedule] = useState<string>('');

    const handleAddSchedule = () => {
        if (newSchedule) {
            setSchedules([...schedules, newSchedule]);
            setNewSchedule('');
        }
    };

    const handleDeleteSchedule = (index: number) => {
        const updatedSchedules = schedules.filter((_, i) => i !== index);
        setSchedules(updatedSchedules);
    };

    return (
        <div>
            <h2>Scheduler</h2>
            <input
                type="text"
                value={newSchedule}
                onChange={(e) => setNewSchedule(e.target.value)}
                placeholder="Add new schedule"
            />
            <button onClick={handleAddSchedule}>Add</button>
            <ul>
                {schedules.map((schedule, index) => (
                    <li key={index}>
                        {schedule}
                        <button onClick={() => handleDeleteSchedule(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scheduler;