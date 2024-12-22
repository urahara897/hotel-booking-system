import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";

import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

/* eslint-disable react/prop-types */
function BookingRow({ booking }) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <div data-label="Cabin">
        <Cabin>{booking?.cabins?.name}</Cabin>
      </div>

      <div data-label="Guest">
        <Stacked>
          <span>{booking.guests.fullName}</span>
          <span>{booking.guests.email}</span>
        </Stacked>
      </div>

      <div data-label="Dates">
        <Stacked>
          <span>
            {isToday(new Date(booking.startDate))
              ? "Today"
              : formatDistanceFromNow(booking.startDate)}{" "}
            &rarr; {booking.numNights} nights
          </span>
          <span>
            {format(new Date(booking.startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(booking.endDate), "MMM dd yyyy")}
          </span>
        </Stacked>
      </div>

      <div data-label="Status">
        <Tag type={statusToTagName[booking.status]}>
          {booking.status.replace("-", " ")}
        </Tag>
      </div>

      <div data-label="Amount">
        <Amount>{formatCurrency(booking.totalPrice)}</Amount>
      </div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={booking.id} />
          <Menus.List id={booking.id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${booking.id}`)}
            >
              See Details
            </Menus.Button>
            {booking.status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${booking.id}`)}
              >
                Check In
              </Menus.Button>
            )}
            {booking.status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(booking.id)}
                disabled={isCheckingOut}
              >
                Check Out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete Booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(booking.id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
