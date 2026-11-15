import { useState } from 'react';
import Modal from './Modal';
import StarRating from './StarRating';
import { MessageCircle, Send, Star, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useNotifications } from '../context/NotificationContext';

export default function CommentModal({
  isOpen,
  onClose,
  menu,
  reviews = [],
  onAddReview,
}) {
  const { addToast } = useToast();
  const { addNotification } = useNotifications();

  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !menu) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedComment = comment.trim();
    if (trimmedComment.length < 5) {
      setError('Komentar harus memiliki minimal 5 karakter!');
      return;
    }

    if (rating < 1 || rating > 5) {
      setError('Silakan pilih rating bintang 1 hingga 5');
      return;
    }

    const reviewerName = name.trim() || 'Pengunjung KopiKu';
    const newReview = {
      id: 'rev-' + Date.now(),
      name: reviewerName,
      rating: Number(rating),
      comment: trimmedComment,
      date: new Date().toISOString().split('T')[0],
    };

    onAddReview(menu.id, newReview);

    addToast(`Ulasan untuk "${menu.name}" berhasil ditambahkan!`, 'success');
    addNotification(
      'Ulasan Ditambahkan ⭐',
      `${reviewerName} memberikan rating ${rating} bintang untuk ${menu.name}.`,
      'comment'
    );

    setComment('');
    setName('');
    setRating(5);
    setError('');
  };

  const isFormValid = comment.trim().length >= 5;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Ulasan & Komentar: ${menu.name}`}
      icon={MessageCircle}
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">
        {/* Form Input Section */}
        <form onSubmit={handleSubmit} className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Tulis Pengalaman & Ulasan Anda
          </h4>

          {/* Rating Stars Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-700 block">
              Beri Penilaian Bintang (1 - 5):
            </label>
            <div className="flex items-center gap-3">
              <StarRating rating={rating} setRating={setRating} size={24} />
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                {rating} / 5 Bintang
              </span>
            </div>
          </div>

          {/* Reviewer Name Input */}
          <div className="space-y-1">
            <label htmlFor="reviewer-name-input" className="text-xs font-semibold text-zinc-700 block">
              Nama Anda (Opsional):
            </label>
            <input
              id="reviewer-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Rian Pratama (Default: Pengunjung KopiKu)"
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-amber-600 transition-colors shadow-sm"
            />
          </div>

          {/* Comment Textarea (Min 5 chars) */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label htmlFor="comment-text-input" className="text-xs font-semibold text-zinc-700 block">
                Komentar / Ulasan:
              </label>
              <span
                className={`text-[10px] font-mono ${
                  comment.trim().length >= 5 ? 'text-emerald-700 font-bold' : 'text-zinc-500'
                }`}
              >
                {comment.trim().length} / 5 karakter minimal
              </span>
            </div>
            <textarea
              id="comment-text-input"
              rows={3}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ceritakan rasa, aroma, atau pengalaman Anda menikmati menu ini..."
              className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-amber-600 transition-colors resize-none leading-relaxed shadow-sm"
            />
          </div>

          {error && (
            <p className="text-xs text-rose-600 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              isFormValid
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20 active:scale-[0.99]'
                : 'bg-stone-200 text-zinc-400 cursor-not-allowed border border-stone-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Komentar Sekarang</span>
          </button>
        </form>

        {/* Existing Reviews List (New comments appear directly at top) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Daftar Ulasan Masuk ({reviews.length})</span>
            </h4>
            <span className="text-[11px] text-zinc-500">
              Komentar baru tampil paling atas
            </span>
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {reviews.length === 0 ? (
              <p className="text-xs text-zinc-400 py-6 text-center">
                Belum ada komentar untuk menu ini. Tulis komentar pertama Anda di atas!
              </p>
            ) : (
              reviews.map((rev, index) => (
                <div
                  key={rev.id || index}
                  className={`p-3.5 rounded-xl border transition-all ${
                    index === 0
                      ? 'bg-amber-50/80 border-amber-300 shadow-sm'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900">
                        {rev.name}
                      </span>
                      {index === 0 && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 border border-amber-300">
                          Baru
                        </span>
                      )}
                    </div>
                    <StarRating rating={rev.rating} readOnly size={12} />
                  </div>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    {rev.comment}
                  </p>
                  <span className="text-[10px] text-zinc-400 mt-1 block">
                    {rev.date}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
