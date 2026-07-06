import { useState } from 'react';
import type { FilterType, SortType, TripEvent } from '../types/event.ts';
import { INITIAL_EVENT } from '../mock/data.ts';
import Header from '../UI/Header/Header.tsx';
import TripSort from '../UI/TripSort/TripSort.tsx';
import EventForm from '../UI/EventForm/EventForm.tsx';
import EventCard from '../UI/EventCard/EventCard.tsx';
import styles from './App.module.css';

const App = () => {
  const [filter, setFilter] = useState<FilterType>('everything');
  const [sort, setSort] = useState<SortType>('day');
  const [events, setEvents] = useState<TripEvent[]>([INITIAL_EVENT]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const totalCost = events.reduce(
    (sum, event) => sum + event.price + event.offers.reduce((summary, offer) => summary + offer.price, 0),
    0,
  );

  const handleAddSubmit = (newEvent: TripEvent) => {
    setEvents((prev) => [...prev, newEvent]);
    setIsAddingNew(false);
  };

  const handleEditSubmit = (updatedEvent: TripEvent) => {
    setEvents((prev) => prev.map((element) => (element.id === updatedEvent.id ? updatedEvent : element)));
    setEditingEventId(null);
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((element) => element.id !== id));
    setEditingEventId(null);
  };

  const handleToggleFavorite = (id: string) => {
    setEvents((prev) =>
      prev.map((element) => (element.id === id ? { ...element, isFavorite: !element.isFavorite } : element)),
    );
  };

  return (
    <div className={styles['page-body']}>
      <Header
        title="Amsterdam — Chamonix — Geneva"
        dates="18 — 20 Mar"
        totalCost={totalCost}
        activeFilter={filter}
        onFilterChange={setFilter}
        onAddEventClick={() => setIsAddingNew(true)}
        isAddButtonDisabled={isAddingNew}
      />

      <main className={styles['page-body__page-main']}>
        <div className="page-body__container">
          <section className={styles['trip-events']}>
            <h2 className="visually-hidden">Trip events</h2>

            <TripSort activeSort={sort} onSortChange={setSort} />

            <ul className={styles['trip-events__list']}>
              {isAddingNew && (
                <li className={styles['trip-events__item']}>
                  <EventForm
                    mode="add"
                    onSubmit={handleAddSubmit}
                    onCancel={() => setIsAddingNew(false)}
                  />
                </li>
              )}

              {events.map((event) => (
                <li className={styles['trip-events__item']} key={event.id}>
                  {editingEventId === event.id ? (
                    <EventForm
                      mode="edit"
                      event={event}
                      onSubmit={handleEditSubmit}
                      onCancel={() => setEditingEventId(null)}
                      onDelete={handleDelete}
                      onRollup={() => setEditingEventId(null)}
                    />
                  ) : (
                    <EventCard event={event} onToggleFavorite={handleToggleFavorite} onOpen={() => setEditingEventId(event.id)} />
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;