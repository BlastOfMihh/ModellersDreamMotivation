from backhand import db

from sqlalchemy import ForeignKey, Integer, BLOB
from sqlalchemy.orm import Mapped , mapped_column , DeclarativeBase , relationship

class Submission(db.Model):
    __tablename__ = "submissions"
    # _id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer)
    # contest_id = db.Column(db.Integer)
    # binary_model = db.Column(db.LargeBinary)
    _id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users._id"))
    contest_id: Mapped[int] = mapped_column(ForeignKey("contests._id"))
    binary_model = db.Column(db.LargeBinary, nullable=False)
    
    # user: Mapped["User"] = relationship(back_populates="contests")
    # contest: Mapped["Contest"] = relationship(back_populates="users")


    def __init__(self, user_id, contest_id, binary_model):
        self.user_id = user_id
        self.contest_id = contest_id
        self.binary_model = binary_model

    def to_dict(self):
        return {
            'id': self._id,
            'user_id': self.user_id,
            'contest_id': self.contest_id,
            'binary_model': self.binary_model
        }

    def __repr__(self):
        return f"<Submission id={self._id}, user_id={self.user_id}, contest_id={self.contest_id}>"