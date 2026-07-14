import { useEffect, useMemo, useState } from 'react';
import type { FilterType, SortType, TripEvent } from '../../../types/event';
import Header from '../../pages/Header/Header';
import TripSort from '../../UI/TripSort/TripSort';
import EventForm from '../../widgets/EventForm/EventForm';
import EventCard from '../../pages/EventCard/EventCard';
import { filterEvents, sortEvents } from '../../../utils/events';
import { createEvent, deleteEvent, fetchEvents, updateEvent } from '../../../services/eventsApi';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [filter, setFilter] = useState<FilterType>('everything');
  const [sort, setSort] = useState<SortType>('day');
  const [events, setEvents] = useState<TripEvent[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchEvents().then((loadedEvents) => {
      if (isMounted) setEvents(loadedEvents);
    });

    return () => {
      isMounted = false;
    };
    }, []);

  const totalCost = events.reduce(
    (sum, event) => sum + event.price + event.offers.reduce((summary, offer) => summary + offer.price, 0),
    0,
  );

  const displayedEvents = useMemo(
    () => sortEvents(filterEvents(events, filter), sort),
    [events, filter, sort],
  );

  const isEmpty = events.length === 0;

  const handleAddEventClick = () => {
    setEditingEventId(null);
    setFilter('everything');
    setSort('day');
    setIsAddingNew(true);
  };

  const handleOpenEdit = (id: string) => {
    setIsAddingNew(false);
    setEditingEventId(id);
  };

  const handleAddSubmit = (newEvent: TripEvent) => {
    setEvents((prev) => sortEvents([...prev, newEvent], 'day'));
    setIsAddingNew(false);
  };

  const handleEditSubmit = (updatedEvent: TripEvent) => {
    setEvents((prev) =>
      sortEvents(
        prev.map((element) => (element.id === updatedEvent.id ? updatedEvent : element)),
        sort,
      ),
    );
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

  const handleCancelAdd = () => {
    setIsAddingNew(false);
  };

  const handleCloseEdit = () => {
    setEditingEventId(null);
  };

  return (
    <div className={styles['page-body']}>
      <Header
        title="Amsterdam — Chamonix — Geneva"
        dates="18 — 20 Mar"
        totalCost={totalCost}
        activeFilter={filter}
        onFilterChange={setFilter}
        onAddEventClick={handleAddEventClick}
        isAddButtonDisabled={isAddingNew}
      />

      <main className={styles['page-body__page-main']}>
        <div className="page-body__container">
          <section className={styles['trip-events']}>
            <h2 className="visually-hidden">Trip events</h2>

            <TripSort activeSort={sort} onSortChange={setSort} />

            {isEmpty && !isAddingNew && (
              <p className={styles['trip-events__msg']}>
                Click New Event to create your first point
              </p>
            )}

            {(!isEmpty || isAddingNew) && (
              <ul className={styles['trip-events__list']}>
                {isAddingNew && (
                  <li className={styles['trip-events__item']}>
                    <EventForm
                      mode="add"
                      onSubmit={handleAddSubmit}
                      onCancel={handleCancelAdd}
                    />
                  </li>
                )}

                {displayedEvents.map((event) => (
                  <li className={styles['trip-events__item']} key={event.id}>
                    {editingEventId === event.id ? (
                      <EventForm
                        mode="edit"
                        event={event}
                        onSubmit={handleEditSubmit}
                        onCancel={handleCloseEdit}
                        onDelete={handleDelete}
                        onRollup={handleCloseEdit}
                      />
                    ) : (
                      <EventCard
                        event={event}
                        onToggleFavorite={handleToggleFavorite}
                        onOpen={() => handleOpenEdit(event.id)}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
