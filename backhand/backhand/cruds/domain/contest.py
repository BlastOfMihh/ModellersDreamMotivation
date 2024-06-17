from backhand import db
from datetime import datetime

from sqlalchemy import ForeignKey, Integer, String, Text, DateTime
from sqlalchemy.orm import Mapped , mapped_column , DeclarativeBase , relationship


class Contest(db.Model):
    __tablename__='contests'
    _id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    max_participants_count:Mapped[int] = mapped_column(Integer, nullable=False)
    task:Mapped[str] = mapped_column(Text, nullable=False)
    start_time:Mapped[datetime] = mapped_column(DateTime, nullable=False)
    end_time:Mapped[datetime] = mapped_column(DateTime, nullable=False)
    # children: Mapped[List["Submission"]] = relationship(back_populates="contest")

    def __init__(self, name, max_participants_count, task, start_time, end_time):
        self.name = name
        self.max_participants_count = max_participants_count
        self.task = task
        self.start_time = start_time
        self.end_time = end_time

    def to_dict(self):
        return {
            'id': self._id,
            'name': self.name,
            'max_participants_count': self.max_participants_count,
            'task': self.task,
            'start_time': self.start_time,
            'end_time': self.end_time
        }