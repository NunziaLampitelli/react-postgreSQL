import { useState } from "react";
import "./components-css/client-material-calendar.css";

const weekDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

type Reminder = {
	title: string;
	text: string;
};

export default function ClientMaterialCalendar() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [reminders, setReminders] = useState<Record<string, Reminder[]>>({});
	const [modalDay, setModalDay] = useState<number | null>(null);
	const [modalTitle, setModalTitle] = useState("");
	const [modalText, setModalText] = useState("");
	const [editingReminder, setEditingReminder] = useState<{
		day: number;
		index: number;
	} | null>(null);

	const firstDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	);
	const lastDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0
	);
	const startDay = firstDayOfMonth.getDay();
	const daysInMonth = lastDayOfMonth.getDate();

	const handlePrevMonth = () =>
		setCurrentDate(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
		);
	const handleNextMonth = () =>
		setCurrentDate(
			(prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
		);
	const handleToday = () => setCurrentDate(new Date());

	const handleDayClick = (day: number) => {
		setModalDay(day);
		setModalTitle("");
		setModalText("");
		setEditingReminder(null);
	};

	const handleEditReminder = (day: number, index: number) => {
		const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
		const reminder = reminders[key]?.[index];
		if (reminder) {
			setModalDay(day);
			setModalTitle(reminder.title);
			setModalText(reminder.text);
			setEditingReminder({ day, index });
		}
	};

	const saveReminder = () => {
		if (modalDay === null || !modalText.trim() || !modalTitle.trim()) return;
		const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${modalDay}`;

		if (editingReminder) {
			setReminders((prev) => {
				const updated = [...(prev[key] || [])];
				updated[editingReminder.index] = {
					title: modalTitle,
					text: modalText,
				};
				return { ...prev, [key]: updated };
			});
		} else {
			const newReminder = { title: modalTitle, text: modalText };
			setReminders((prev) => ({
				...prev,
				[key]: [...(prev[key] || []), newReminder],
			}));
		}

		setModalDay(null);
		setModalTitle("");
		setModalText("");
		setEditingReminder(null);
	};

	const deleteReminder = () => {
		if (!editingReminder) return;
		const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${
			editingReminder.day
		}`;
		setReminders((prev) => {
			const updated = [...(prev[key] || [])];
			updated.splice(editingReminder.index, 1);
			return { ...prev, [key]: updated };
		});
		setModalDay(null);
		setModalTitle("");
		setModalText("");
		setEditingReminder(null);
	};

	const daysArray: React.ReactNode[] = [];
	for (let i = 0; i < startDay; i++) {
		daysArray.push(
			<div key={`empty-start-${i}`} className="calendar-day empty" />
		);
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
		const dayReminders = reminders[key] || [];
		daysArray.push(
			<div
				key={day}
				className="calendar-day clickable"
				onClick={() => handleDayClick(day)}
			>
				<div className="calendar-day-number">{day}</div>
				<ul className="reminder-list">
					{dayReminders.map((r, index) => (
						<li key={index} className="reminder-item" title={r.text}>
							{r.title}
						</li>
					))}
				</ul>
			</div>
		);
	}

	const totalDisplayed = startDay + daysInMonth;
	const remainingCells =
		totalDisplayed % 7 === 0 ? 0 : 7 - (totalDisplayed % 7);
	for (let i = 0; i < remainingCells; i++) {
		daysArray.push(
			<div key={`empty-end-${i}`} className="calendar-day empty" />
		);
	}

	return (
		<div className="calendar-container">
			<p className="calendar-title">Material orders scheduled day</p>
			<div className="calendar-header">
				<h2 className="calendar-title">
					{currentDate.toLocaleString("default", {
						month: "long",
						year: "numeric",
					})}
				</h2>
			</div>
			<div className="calendar-controls">
				<button onClick={handlePrevMonth}>← Previous</button>
				<button onClick={handleToday}>Current Month</button>
				<button onClick={handleNextMonth}>Next →</button>
			</div>
			<div className="calendar-weekdays">
				{weekDays.map((day) => (
					<div key={day} className="calendar-weekday">
						{day}
					</div>
				))}
			</div>
			<div className="calendar-grid">{daysArray}</div>
			{modalDay !== null && (
				<div className="modal-backdrop">
					<div className="modal">
						<h3>Reminders for day {modalDay}</h3>
						<ul className="reminder-list">
							{(
								reminders[
									`${currentDate.getFullYear()}-${currentDate.getMonth()}-${modalDay}`
								] || []
							).map((r, i) => (
								<li
									key={i}
									title={r.text}
									className="reminder-item clickable"
									onClick={() => handleEditReminder(modalDay, i)}
								>
									<strong>{r.title}</strong>
								</li>
							))}
						</ul>
						<input
							type="text"
							value={modalTitle}
							onChange={(e) => setModalTitle(e.target.value)}
							placeholder="Reminder title"
						/>
						<input
							type="text"
							value={modalText}
							onChange={(e) => setModalText(e.target.value)}
							placeholder="Reminder details"
						/>
						<div className="modal-buttons">
							<button onClick={saveReminder}>Save</button>
							{editingReminder && (
								<button onClick={deleteReminder}>Delete</button>
							)}
							<button
								onClick={() => {
									setModalDay(null);
									setEditingReminder(null);
									setModalTitle("");
									setModalText("");
								}}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
