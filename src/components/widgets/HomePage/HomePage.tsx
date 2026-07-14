import { useEffect, useMemo, useState } from 'react';
import type { FilterType, SortType, TripEvent } from '../../../types/event';
import Header from '../../pages/Header/Header';
import TripSort from '../../UI/TripSort/TripSort';
import EventForm from '../../widgets/EventForm/EventForm';
import EventCard from '../../pages/EventCard/EventCard';
import { filterEvents, sortEvents } from '../../../utils/events';
import { getRouteTitle, getTripDates } from '../../../utils/trip';
import { createEvent, deleteEvent, fetchEvents, updateEvent } from '../../../api/eventsApi';
import styles from './HomePage.module.css';

const ALL_FILTERS: FilterType[] = ['everything', 'future', 'present', 'past'];

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

  const routeTitle = useMemo(() => getRouteTitle(events), [events]);
  const tripDates = useMemo(() => getTripDates(events), [events]);

  const disabledFilters = useMemo(
    () => ALL_FILTERS.filter((filterValue) => filterEvents(events, filterValue).length === 0),
    [events],
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

  const handleAddSubmit = async (newEvent: TripEvent) => {
    const savedEvent = await createEvent(newEvent);
    setEvents((prev) => sortEvents([...prev, savedEvent], 'day'));
    setIsAddingNew(false);
  };

  const handleEditSubmit = async (updatedEvent: TripEvent) => {
    const savedEvent = await updateEvent(updatedEvent);
    setEvents((prev) =>
      sortEvents(
        prev.map((element) => (element.id === savedEvent.id ? savedEvent : element)),
        sort,
      ),
    );
    setEditingEventId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((element) => element.id !== id));
    setEditingEventId(null);
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
        title={routeTitle}
        dates={tripDates}
        totalCost={totalCost}
        activeFilter={filter}
        onFilterChange={setFilter}
        onAddEventClick={handleAddEventClick}
        isAddButtonDisabled={isAddingNew}
        disabledFilters={disabledFilters}
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
