from backhand import db

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped , mapped_column , DeclarativeBase , relationship



class User(db.Model):
    __tablename__='users'
    _id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    # rank = db.Column(db.Integer, nullable=False)
    rank:Mapped[int] = mapped_column(Integer, nullable=False)
    user_type:Mapped[str] = mapped_column(String(50), nullable=False)
    password: Mapped[str] = mapped_column(String(50), nullable=False)

    # children: Mapped[List["Submission"]] = relationship(back_populates="contest")

    def __init__(self, username, rank, user_type, password):
        self.username=username
        self.user_type=user_type
        self.password=password
        self.rank=rank

    def __repr__(self):
        return f'<User {self.username}>'

    def to_dict(self):
        return {"id" : self._id, "username": self.username, "rank":self.rank, "user_type":self.user_type}